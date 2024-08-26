// chamar dependências
const express = require('express');

// inicialização do roteador
const router = express.Router();

// chamar controladores
const { createUser, getUser, getUsers, loginUser } = require('../controllers/userCtrl');

// rota para criar um usuário
router.post('/register', createUser);

// rota para puxar um usuário
router.get('/:id', getUser);

// rota para puxar todos os usuários
router.get('/', getUsers);

// rota para o login 
router.post('/login', loginUser);

// exportar o roteador
module.exports = router;