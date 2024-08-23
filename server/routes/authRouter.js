// chamar dependências
const express = require('express');

// inicialização do roteador
const router = express.Router();

// chamar controladores
const { createUser, getUser, getUsers } = require('../controllers/userCtrl');

// rota para criar um usuário
router.post('/register', createUser);

// rota para puxar um usuário
router.get('/:id', getUser);

// rota para puxar todos os usuários
router.get('/', getUsers);

// exportar o roteador
module.exports = router;