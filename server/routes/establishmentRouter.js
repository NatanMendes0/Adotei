// chamar dependências
const express = require('express');

// chamar controladores
const { 
    addEmployeeById,
    createEstablishment,
    getEstablishmentById,
    getEstablishments,
    getEstablishmentsByOwner,
    getEstablishmentsByText,
    removeEmployeeById,
    getEmployeesByEstablishment,
    updateEstablishment,
    deleteEstablishment
} = require('../controllers/establishmentCtrl');

// chamar middleware que verifica a autenticação
const { authMiddleware } = require('../middleware/authMiddleware');

// inicialização do roteador
const router = express.Router();

// listar todos os estabelecimentos
router.get('/', getEstablishments);

// listar pelo id
router.get('/:id', getEstablishmentById);

// listar todos os estabelecimentos que contenham um determinado texto
router.get('/buscar/:text', getEstablishmentsByText);

// listar todos os estabelecimentos ao qual o usuário autenticado pertence
router.get('/meus-estabelecimentos/:id', authMiddleware, getEstablishmentsByOwner);

// criar um estabelecimento
router.post('/cadastro', authMiddleware, createEstablishment);

// adicionar um funcionário
router.post('/add-funcionario/:establishmentId/:employeeId', authMiddleware, addEmployeeById);

// remover um funcionário
router.delete('/remover-funcionario/:establishmentId/:employeeId', authMiddleware, removeEmployeeById);

// listar funcionários de um estabelecimento
router.get('/funcionarios/:id', getEmployeesByEstablishment);

// atualizar informações do estabelecimento pelo id
router.patch('/:id', authMiddleware, updateEstablishment);

// deletar um estabelecimento pelo id
router.delete('/:id', authMiddleware, deleteEstablishment);

// exportar o roteador
module.exports = router;