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

// exportar controladores
module.exports = { createUser, getUser, getUsers };