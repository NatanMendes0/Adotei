// chamar models de estabelecimento e usuário
const Establishment = require('../models/establishmentsModel');
const User = require('../models/userModel');

// chamar dependências
const asyncHandler = require('express-async-handler');

/* FUNÇÕES DE CONTROLE DE ESTABELECIMENTO */

// criar um estabelecimento
const createEstablishment = asyncHandler(async (req, res) => {

    // TODO: implementar função quando o usuário não sabe o CEP

    const { cep } = req.body;

    // se não houver cep, enviar mensagem de erro
    if (!cep) {
        res.status(400).json({ message: 'CEP não informado' });
    }

    // se o cep for informado incorretamente, enviar mensagem de erro
    if (cep.length !== 8) {
        res.status(400).json({ message: 'CEP inválido, favor informar um CEP válido' });
    }

    // verificar cep via API ViaCEP
    const findCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const cepData = await findCep.json();

    // se o cep não for encontrado, enviar mensagem de erro
    if (cepData.erro) {
        res.status(400).json({ message: 'CEP não encontrado' });
    }

    // campos do corpo da requisição
    const {
        name,
        description,
        complement,
        number,
    } = req.body;
    const { _id } = req.user;

    // enviar resposta
    try {
        // criar estabelecimento
        const newEstablishment = await Establishment.create({
            name,
            description,
            ownerId: _id,

            // modelo para quando a API ViaCEP estiver funcionando
            address: {
                cep: cepData.cep,
                patio: cepData.logradouro,
                complement: complement,
                number: number,
                neighborhood: cepData.bairro,
                city: cepData.localidade,
                state: cepData.estado,
            },
        });
        res.status(201).json({ message: 'Estabelecimento criado com sucesso', establishment: newEstablishment });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar estabelecimento', error });
    }
});

// adicionar funcionários pelo seu email
const addEmployeeByEmail = asyncHandler(async (req, res) => {

    // campos do corpo da requisição
    const { email } = req.body;
    const { establishmentId } = req.body;

    // buscar usuário pelo email
    const employee = await User.findOne({ email });

    // se o usuário não for encontrado, enviar mensagem de erro
    if (!employee) {
        res.status(400).json({ message: 'Funcionário não encontrado' });
    }

    // se o usuário for encontrado, mas já for um funcionário, enviar mensagem de erro
    if (Establishment.employees.includes(employee._id)) {
        res.status(400).json({ message: 'Este usuário já é um funcionário' });
    }

    // enviar resposta
    try {

        // adicionar funcionário
        const addEmployee = await Establishment.findByIdAndUpdate(
            establishmentId, { $push: { employees: employee._id } }, { new: true }
        );
        res.status(200).json({ message: 'Funcionário adicionado com sucesso', establishment: addEmployee });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao adicionar funcionário', error });
    }
});

// listar todos os estabelecimentos
const getEstablishments = asyncHandler(async (req, res) => {
    const establishments = await Establishment.find({});
    res.status(200).json(establishments);
});

// listar todos os estabelecimentos que contenham um determinado texto em qualquer campo
const getEstablishmentsByText = asyncHandler(async (req, res) => {
    const { text } = req.params;

    // Busca usando o operador $or para buscar o texto em vários campos
    const establishments = await Establishment.find({
        $or: [
            { name: { $regex: text, $options: 'i' } },
            { description: { $regex: text, $options: 'i' } },
            { 'address.cep': { $regex: text, $options: 'i' } },
            { 'address.patio': { $regex: text, $options: 'i' } },
            { 'address.complement': { $regex: text, $options: 'i' } },
            { 'address.neighborhood': { $regex: text, $options: 'i' } },
            { 'address.city': { $regex: text, $options: 'i' } },
            { 'address.state': { $regex: text, $options: 'i' } },
            { 'services.name': { $regex: text, $options: 'i' } },
            { 'services.description': { $regex: text, $options: 'i' } }
        ]
    });

    res.status(200).json(establishments);
});



// exportar funções de controle de estabelecimento
module.exports = {
    createEstablishment,
    addEmployeeByEmail,
    getEstablishments,
    getEstablishmentsByText,
};