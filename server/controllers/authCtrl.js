const Ong = require("../models/ongModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const { generateRefreshToken } = require("../config/refreshToken");

// Login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const ong = await Ong.findOne({ email });
  if (!ong) {
    return res.status(404).json({ message: "ONG não encontrada." });
  }

  if (ong.auth.isBlocked) {
    return res.status(401).json({
      message: "ONG bloqueada. Entre em contato com o suporte!",
    });
  }

  if (await ong.isPasswordMatched(password)) {
    await Ong.findByIdAndUpdate(ong._id, {
      "auth.loginAttempts": 0,
      "auth.lastLogin": new Date(),
    });

    const refreshToken = generateRefreshToken(ong._id);
    const token = generateToken(ong._id);

    await Ong.findByIdAndUpdate(
      ong._id,
      { "auth.refreshToken": refreshToken },
      { new: true }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 5 * 60 * 60 * 1000, // 5 horas
    });

    res.status(200).json({
      _id: ong._id,
      name: ong.name,
      email: ong.email,
      token,
    });
  } else {
    await Ong.findByIdAndUpdate(ong._id, {
      $inc: { "auth.loginAttempts": 1 },
    });

    const updatedOng = await Ong.findById(ong._id);

    if (updatedOng.auth.loginAttempts >= process.env.MAX_LOGIN_ATTEMPTS) {
      await Ong.findByIdAndUpdate(ong._id, { "auth.isBlocked": true });
      return res.status(401).json({
        message:
          "ONG bloqueada por excesso de tentativas. Entre em contato com o suporte!",
      });
    }

    return res.status(401).json({ message: "Senha incorreta." });
  }
});

// Logout
const logout = asyncHandler(async (req, res) => {
  try {
    if (req.cookies && req.cookies.refreshToken) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });

      await Ong.findByIdAndUpdate(req.ong._id, { "auth.refreshToken": null });
    }

    res.status(200).json({ message: "Logout realizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao fazer logout!" });
  }
});

// Criar ONG
const createOng = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const ongExists = await Ong.findOne({ email });
  if (ongExists) {
    return res
      .status(400)
      .json({
        uiMessage: "Já existe uma ONG com este email!",
        error: "Email já cadastrado!",
      });
  }

  try {
    const newOng = await Ong.create(req.body);

    const token = generateToken(newOng._id);
    const refreshToken = generateRefreshToken(newOng._id);

    await Ong.findByIdAndUpdate(
      newOng._id,
      {
        "auth.refreshToken": refreshToken,
        "auth.lastLogin": new Date(),
      },
      { new: true }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 5 * 60 * 60 * 1000, // 5 horas
    });

    res.status(201).json({
      data: {
        _id: newOng._id,
        name: newOng.name,
        completedOnboarding: newOng.completedOnboarding,
        token,
      },
      uiMessage: "ONG cadastrada com sucesso! Você já está logado.",
      message: "ONG cadastrada com sucesso!",
    });
  } catch (error) {
    res.status(500).json({
      uiMessage: "Erro ao criar ONG!",
      error: error,
    });
  }
});

module.exports = {
  login,
  logout,
  createOng,
};
