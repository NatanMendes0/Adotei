// chamar dependências
const jwt = require('jsonwebtoken');
const assyncHandler = require('express-async-handler');

// chamar models
const User = require('../models/userModel');

// chamar função de autenticação (gerar token)
const { generateToken } = require('../config/jwtToken');

// função que verifica se o usuário está logado via cookies
const authMiddleware = assyncHandler(async (req, res, next) => {
    let token;

    // verifica se o token que começa com "bearer" existe no cabeçalho de cookies
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // se o token "bearer" não existir, verifica se o refreshToken existe no cabeçalho de cookies
    else if (req.cookies && req.cookies.refreshToken) {
        const refreshToken = req.cookies.refreshToken;
        const user = await User.findOne({ refreshToken });

        // se o usuário existir, gera um novo token
        if (user) {
            token = generateToken(user._id);
            res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
            return next();
        }
    }

    // se a var token existir e for válida, verifica se o usuário existe
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = req.user = await User.findById(decoded.id);
            if (user) {
                req.user = user;
                next();
            } else {
                res.status(401).json({ message: 'Não autorizado, usuário não encontrado' });
            }
        } catch (error) {
            res.status(401).json({ message: 'Não autorizado, token inválido' });
        }
    }
})

//função que verifica se o usuário é o usuário original
const isOriginalUser = async (req, res, next) => {
    let token;

    // verifica se o token que começa com "bearer" existe no cabeçalho de cookies
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // se o token "bearer" não existir, verifica se o refreshToken existe no cabeçalho de cookies
    else if (req.cookies && req.cookies.refreshToken) {
        const refreshToken = req.cookies.refreshToken;
        const user = await User.findOne({ refreshToken });

        // se o usuário existir, gera um novo token
        if (user) {
            token = generateToken(user._id);
            res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
        }
    }

    // se a var token existir e for válida, verifica se o usuário existe
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = req.user = await User.findById(decoded.id);
            if (user) {
                req.user = user;
            } else {
                return res.status(401).json({ message: 'Não autorizado, usuário não encontrado' });
            }
        } catch (error) {
            return res.status(401).json({ message: 'Não autorizado, token inválido' });
        }
    }

    // verifica se o usuário é o usuário original
    if (req.user._id.toString() !== req.params.id) {
        return res.status(403).json({ message: 'Não autorizado, usuário não é o usuário original' });
    }

    next();
}

module.exports = { authMiddleware, isOriginalUser };