// chamar dependências
const express = require('express');

// chamar controladores
const { 
    createEstablishment, 
    // getEstablishment, 
    // getEstablishments, 
    // editEstablishment, 
    // deleteEstablishment,
} = require('../controllers/establishmentCtrl');

// chamar middleware que verifica a autenticação
const { authMiddleware } = require('../middleware/authMiddleware');

// inicialização do roteador
const router = express.Router();

// criar um estabelecimento
router.post('/cadastro', authMiddleware, createEstablishment);

// exportar o roteador
module.exports = router;