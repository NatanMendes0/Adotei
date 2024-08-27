// chamar dependências
const express = require('express');

// inicialização do roteador
const router = express.Router();

// chamar controladores
const { 
    createUser, 
    getUser, 
    getUsers, 
    loginUser, 
    editUser, 
    deleteUser,
} = require('../controllers/userCtrl');

// chamar middleware que verifica a autenticação 
// TODO: arrumar problema de verificação de token na rota 
// const { authMiddleware } = require('../middleware/authMiddleware');

// TODO: TRADUZIR ROTAS

// criar um usuário
router.post('/register', createUser);

// puxar um usuário
// TODO: adicionar após resolver problema com token -> router.get('/:id', authMiddleware, getUser);
router.get('/:id', getUser);

// puxar todos os usuários
router.get('/', getUsers);

// login 
router.post('/login', loginUser);

// atualizar usuário
router.put('/edit-user/:id', editUser);

// excluir usuario
router.delete('/delete-user/:id', deleteUser);

// exportar o roteador
module.exports = router;