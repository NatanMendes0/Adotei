// chamar model de usuário
const User = require('../models/userModel');

// chamar dependências
const asyncHandler = require('express-async-handler');
const validateMongoDbID = require('../utils/validadeMongoDbId');

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
    validateMongoDbID(id);
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

// realizar o login do usuário
const loginUser = asyncHandler(async (req, res) => {
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
            // retorna um json com os dados do usuário
            res.status(200).json({
                _id: findUser._id,
                name: findUser.name,
                email: findUser.email,
                establishmentId: findUser.establishmentId,
                role: findUser.role,
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

// exportar controladores
module.exports = { createUser, getUser, getUsers, loginUser };