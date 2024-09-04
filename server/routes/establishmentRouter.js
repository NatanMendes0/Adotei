// chamar dependências
const express = require('express');

// chamar controladores
const { 
    createEstablishment,
    addEmployeeByEmail,
} = require('../controllers/establishmentCtrl');

// chamar middleware que verifica a autenticação
const { authMiddleware } = require('../middleware/authMiddleware');

// inicialização do roteador
const router = express.Router();

// criar um estabelecimento
router.post('/cadastro', authMiddleware, createEstablishment);

// adicionar um funcionário
router.post('/add-funcionario', authMiddleware, addEmployeeByEmail);
// exportar o roteador
module.exports = router;