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
const { authMiddleware, isOriginalUser } = require('../middleware/authMiddleware');


// criar um usuário
router.post('/cadastro', createUser);

// puxar um usuário
router.get('/:id', authMiddleware, getUser);

//TODO: fazer a rota puxar apenas o usuário de um estabelecimento específico
// puxar todos os usuários
router.get('/', getUsers);

// login 
router.post('/login', loginUser);

// atualizar usuário
router.put('/editar-usuario/:id', authMiddleware, isOriginalUser, editUser);

// excluir usuario
router.delete('/deletar-usuario/:id', authMiddleware, isOriginalUser, deleteUser);

// exportar o roteador
module.exports = router;