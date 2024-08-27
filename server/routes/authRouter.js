// chamar dependências
const express = require('express');

// inicialização do roteador
const router = express.Router();

// chamar controladores
const { createUser, getUser, getUsers, loginUser, editUser } = require('../controllers/userCtrl');

// chamar middleware que verifica a autenticação 
// TODO: arrumar problema de verificação de token na rota 
// const { authMiddleware } = require('../middleware/authMiddleware');

// rota para criar um usuário
router.post('/register', createUser);

// rota para puxar um usuário
// TODO: adicionar após resolver problema com token router.get('/:id', authMiddleware, getUser);
router.get('/:id', getUser);

// rota para puxar todos os usuários
router.get('/', getUsers);

// rota para o login 
router.post('/login', loginUser);

// rota para atualizar o token
router.put('/edit-user/:id', editUser);

// exportar o roteador
module.exports = router;