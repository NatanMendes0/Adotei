// chamar dependências
const express = require('express');

// chamar controladores
const { 
    createUser, 
    getUser, 
    getUsers, 
    login, 
    logout,
    editUser, 
    deleteUser,
} = require('../controllers/userCtrl');

// chamar middleware que verifica a autenticação 
const { authMiddleware, isOriginalUser } = require('../middleware/authMiddleware');

// inicialização do roteador
const router = express.Router();

// criar um usuário
router.post('/cadastro', createUser);

// logout 
router.get('/logout', logout);

// puxar um usuário
router.get('/:id', authMiddleware, getUser);

//TODO: fazer a rota puxar apenas o usuário de um estabelecimento específico
// puxar todos os usuários
router.get('/', getUsers);

// login 
router.post('/login', login);

// atualizar usuário
router.put('/editar-usuario/:id', authMiddleware, isOriginalUser, editUser);

// excluir usuario
router.delete('/deletar-usuario/:id', authMiddleware, isOriginalUser, deleteUser);

//TODO: rota de esqueceu a senha

// exportar o roteador
module.exports = router;