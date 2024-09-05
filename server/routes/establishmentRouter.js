// chamar dependências
const express = require('express');

// chamar controladores
const { 
    createEstablishment,
    addEmployeeByEmail,
    getEstablishments,
    getEstablishmentsByText,
} = require('../controllers/establishmentCtrl');

// chamar middleware que verifica a autenticação
const { authMiddleware } = require('../middleware/authMiddleware');

// inicialização do roteador
const router = express.Router();

// criar um estabelecimento
router.post('/cadastro', authMiddleware, createEstablishment);

// adicionar um funcionário
router.post('/add-funcionario', authMiddleware, addEmployeeByEmail);

// listar todos os estabelecimentos
router.get('/', getEstablishments);

// listar todos os estabelecimentos que contenham um determinado texto
router.get('/buscar/:text', getEstablishmentsByText);

// exportar o roteador
module.exports = router;