// chamar models
const User = require('../models/userModel');

// chamar função de autenticação (gerar token)
const { generateToken } = require('../config/jwtToken');

// Função auxiliar para verificar e obter o token
const verifyToken = async (req, res) => {
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

    return token;
};

module.exports = { verifyToken };
