// chamar models
const User = require('../models/userModel');

// chamar dependências
const jwt = require('jsonwebtoken');
const assyncHandler = require('express-async-handler');

// importar a função verifyToken do utils
const {verifyToken} = require('../utils/authUtils');

// Função que verifica se o usuário está logado via cookies
const authMiddleware = assyncHandler(async (req, res, next) => {
    const token = await verifyToken(req, res);

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
    } else {
        res.status(401).json({ message: 'Não autorizado, token não encontrado' });
    }
});

// Função que verifica se o usuário é o usuário original
const isOriginalUser = assyncHandler(async (req, res, next) => {
    const token = await verifyToken(req, res);

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
    } else {
        return res.status(401).json({ message: 'Não autorizado, token não encontrado' });
    }

    // verifica se o usuário é o usuário original
    if (req.user._id.toString() !== req.params.id) {
        return res.status(403).json({ message: 'Não autorizado, usuário não é o usuário original' });
    }

    next();
});

module.exports = { authMiddleware, isOriginalUser };
