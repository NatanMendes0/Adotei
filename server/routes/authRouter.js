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

// TODO: arrumar problema de verificação de token na rota 
// chamar middleware que verifica a autenticação 
// const { authMiddleware } = require('../middleware/authMiddleware');


// criar um usuário
router.post('/cadastro', createUser);

// puxar um usuário
// router.get('/:id', authMiddleware, getUser);
router.get('/:id', getUser);

// puxar todos os usuários
router.get('/', getUsers);

// login 
router.post('/login', loginUser);

// atualizar usuário
router.put('/editar-usuario/:id', editUser);

// excluir usuario
router.delete('/deletar-usuario/:id', deleteUser);

// exportar o roteador
module.exports = router;