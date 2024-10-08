// chamar model de usuário
const User = require('../models/userModel');
const PasswordReset = require('../models/passwordResetModel');

// chamar dependências
const asyncHandler = require('express-async-handler');
const { v4: uuidv4, validate: uuidValidate, v4 } = require("uuid");
const nodemailer = require('nodemailer');

// chamar funções de autenticação (gerar token e atualizar token)
const { generateToken } = require('../config/jwtToken');
const { generateRefreshToken } = require('../config/refreshToken');

// chamar função de verificação de token (controller "esqueceu a senha")
const { handlePasswordReset } = require('../utils/emailTransporter');

/* FUNÇÕES DE CONTROLE DE USUÁRIO */

// criar um usuário
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } else {
        return res.status(400).json({ message: "Usuário já existe!" });
    }
});

// puxar um único usuário
const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const getUser = await User.findById(id);
        res.status(200).json({
            _id: getUser._id,
            name: getUser.name,
            email: getUser.email,
            establishmentId: getUser.establishmentId,
            role: getUser.role,
        });
    } catch (error) {
        return res.status(404).json({ message: "Usuário não encontrado." });
    }
});

// puxar todos os usuários
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json({
        users: users.map((user) => ({
            _id: user._id,
            name: user.name,
            email: user.email,
            establishmentId: user.establishmentId,
            role: user.role,
        })),
    });
});

// realizar o login
const login = asyncHandler(async (req, res) => {

    // realizar o login do usuário
    const { email, password } = req.body;

    //verifica se o usuário existe
    const findUser = await User.findOne({ email });
    if (findUser) {
        // verifica se o usuário está bloqueado, retornando um json se estiver
        if (findUser.isBlocked) {
            return res.status(401).json({ message: "Usuário bloqueado. Entre em contato com seu administrador!" });
        }
        // verifica se a senha está correta
        if (await findUser.isPasswordMatched(password)) {
            // se a senha estiver correta, reseta a quantidade de tentativas de login
            await User.findByIdAndUpdate(findUser._id, { loginAttempts: 0 });

            // se a senha estiver correta, gera um refreshToken de autenticação
            const refreshToken = await generateRefreshToken(findUser.id);
            await User.findByIdAndUpdate(findUser._id, { refreshToken: refreshToken }, { new: true });

            // gera um cookie com o refreshToken
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                maxAge: 5 * 60 * 60 * 1000,
            });

            // retorna um json com os dados do usuário
            res.status(200).json({
                _id: findUser?._id,
                name: findUser?.name,
                email: findUser?.email,
                establishmentId: findUser?.establishmentId,
                role: findUser?.role,
                token: generateToken(findUser?._id),
            });
        }
        // se a senha estiver incorreta, atualiza no banco a quantidade de tentativas de login
        else {
            await User.findByIdAndUpdate(findUser._id, { $inc: { loginAttempts: 1 } });
            const updatedUser = await User.findById(findUser.id);
            // se a quantidade de tentativas for igual a 3, bloqueia o usuário
            if (updatedUser.loginAttempts >= process.env.MAX_LOGIN_ATTEMPTS) {
                await User.findByIdAndUpdate(findUser._id, { isBlocked: true });
                return res.status(401).json({ message: "Não é possível fazer login. Usuário bloqueado. Entre em contato com seu administrador!" });
            }
            return res.status(401).json({ message: "Senha incorreta." });
        }
    }
    // se o usuário não existir, retorna um json
    else {
        return res.status(404).json({ message: "E-mail não encontrado." });
    }
});

// editar um usuário
const editUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Não é possível editar. Usuário não encontrado!" });
        }
        // atualizar propriedades de usuário baseado na requisição
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.establishmentId = req.body.establishmentId || user.establishmentId;
        user.role = req.body.role || user.role;
        await user.save();

        return res.status(200).json({
            message: "Usuário editado com sucesso!",
            _id: user._id,
            name: user.name,
            email: user.email,
            establishmentId: user.establishmentId,
            role: user.role,
        });
    } catch {
        return res.status(404).json({ message: "Não é possível editar. Usuário não encontrado!" });
    }
});

// excluir um usuário
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Não é possível excluir. Usuário não encontrado!" });
        }
        await User.findByIdAndDelete(id);
        return res.status(200).json({ message: "Usuário excluído da plataforma!" });
    } catch {
        return res.status(404).json({ message: "Não é possível excluir. Usuário não encontrado!" });
    }
});

// realizar o logout
const logout = asyncHandler(async (req, res) => {
    try {
        // verifica se o refreshToken existe no cabeçalho de cookies
        if (req.cookies && req.cookies.refreshToken) {
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: true,
            });
        }
        // se o refreshToken não existir, verifica se o token existe no cabeçalho de cookies
        else if (req.cookies && req.cookies.token) {
            res.clearCookie("token", {
                httpOnly: true,
                secure: true,
            });
        }
        res.status(200).json({ message: "Logout realizado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao fazer logout!" });
    }
});

// esqueceu a senha - gera um token de recuperação de senha
const generateForgotPasswordToken = asyncHandler(async (req, res) => {

    // puxar o email do corpo da requisição e verificar se o usuário existe no banco
    const { email } = req.body;
    const user = await User.findOne({ email });

    // se o usuário não existir, retorna um json
    if (!user) {
        return res.status(404).json({ message: "E-mail não encontrado!" });
    }

    // se o usuário existir, chama a função handlePasswordReset
    await handlePasswordReset(user, res);

});

// esqueceu a senha - confirma o token de recuperação de senha e atualiza para uma nova senha
const resetPassword = asyncHandler(async (req, res) => {
    // puxar o token e senha da requisição
    const { token } = req.params;
    const { password } = req.body;

    // verifica se o token gerado é válido pelo uuid
    if (!uuidValidate(token)) {
        return res.status(404).json({ message: "Token inválido!" });
    }

    // verifica se o token existe no banco
    const request = await PasswordReset.findOne({ token });

    // se o token não existir, retorna um json
    if (!request) {
        return res.status(404).json({ message: "Token não encontrado!" });
    }

    // se o token existir, atualiza a senha do usuário
    try {
        // atualiza a senha do usuário
        const user = await User.findById(request.userId);
        user.password = password;
        await user.save();
        return res.status(200).json({ message: "Senha atualizada com sucesso!" });
    } catch {
        return res.status(404).json({ message: "Não foi possível atualizar a senha!" });
    }
});

// exportar controladores
module.exports = {
    createUser,
    login,
    getUser,
    getUsers,
    editUser,
    deleteUser,
    logout,
    generateForgotPasswordToken,
    resetPassword,
};