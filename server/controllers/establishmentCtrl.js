// chamar models de estabelecimento e usuário
const Establishment = require('../models/establishmentsModel');
const User = require('../models/userModel');

// chamar dependências
const asyncHandler = require('express-async-handler');

/* FUNÇÕES DE CONTROLE DE ESTABELECIMENTO */

// criar um estabelecimento
const createEstablishment = asyncHandler(async (req, res) => {
    
    /** DEVE ENVIAR UMA REQUISIÇÃO COM O SEGUINTE CORPO:
     * - name: String
     * - description: String
     * - cep: string <- enviar requisição para a viacep e preencher os campos abaixo
     * - patio: string
     * - complement: string
     * - number: number
     * - neighborhood: string
     * - city: string
     * - state: string
     */

    const { name, description, cep } = req.body;

    // verificar cep via API ViaCEP
    const findCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const cepData = await findCep.json();

    res.status(200).json(cepData);
});

// exportar funções de controle de estabelecimento
module.exports = {
    createEstablishment,
};