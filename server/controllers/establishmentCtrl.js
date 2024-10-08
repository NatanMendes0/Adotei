// chamar models de estabelecimento e usuário
const Establishment = require('../models/establishmentsModel');
const User = require('../models/userModel');

// chamar dependências
const asyncHandler = require('express-async-handler');

/* FUNÇÕES DE CONTROLE DE ESTABELECIMENTO */

// criar um estabelecimento
const createEstablishment = asyncHandler(async (req, res) => {

    const { cep } = req.body;

    // se não houver cep, enviar mensagem de erro
    if (!cep) {
        return res.status(400).json({ message: 'CEP não informado' });
    }

    // se o cep for informado incorretamente, enviar mensagem de erro
    if (cep.length !== 8) {
        return res.status(400).json({ message: 'CEP inválido, favor informar um CEP válido' });
    }

    // verificar cep via API ViaCEP
    const findCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const cepData = await findCep.json();

    // se o cep não for encontrado, enviar mensagem de erro
    if (cepData.erro) {
        return res.status(400).json({ message: 'CEP não encontrado' });
    }

    // Função para remover acentos de uma string
    const removeAccents = (str) => {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    // Remover acentos dos campos do JSON recebido
    cepData.logradouro = removeAccents(cepData.logradouro);
    cepData.bairro = removeAccents(cepData.bairro);
    cepData.localidade = removeAccents(cepData.localidade);
    cepData.estado = removeAccents(cepData.uf);

    // Campos do corpo da requisição
    const {
        name,
        description,
        complement,
        number,
    } = req.body;
    const { _id } = req.user;

    // Enviar resposta
    try {
        // Criar estabelecimento
        const newEstablishment = await Establishment.create({
            name,
            description,
            ownerId: _id,

            // Inserir os dados da API ViaCEP sem acentos
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

// listar todos os estabelecimentos ao qual o dono é o usuário logado
const getEstablishmentsByOwner = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const establishments = await Establishment
            .find({ ownerId: id })
            .populate('employees', 'name email');
        res.status(200).json(establishments);
    } catch (error) {
        return res.status(404).json({ message: "Estabelecimentos não encontrados." });
    }
});

// adicionar funcionários em um estabelecimento pelo id do estabelecimento + id do usuário
const addEmployeeById = asyncHandler(async (req, res) => {
    console.log(req.params);
    const { establishmentId, employeeId } = req.params;

    // buscar usuário pelo id
    const employee = await User.findById(employeeId);

    // se o usuário não for encontrado, enviar mensagem de erro
    if (!employee) {
        res.status(400).json({ message: 'Funcionário não encontrado' });
    }

    // se o usuário for encontrado, mas já for um funcionário, enviar mensagem de erro
    if (employee.establishment) {
        res.status(400).json({ message: 'Usuário já é um funcionário' });
    }

    // enviar resposta
    try {
        const addEmployee = await Establishment.findByIdAndUpdate(
            establishmentId, { $push: { employees: employeeId } }, { new: true }
        );
        res.status(200).json({ message: 'Funcionário adicionado com sucesso', establishment: addEmployee });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao adicionar funcionário', error });
    }
});

//remover funcionarios pelo seu id + id do estabelecimento
const removeEmployeeById = asyncHandler(async (req, res) => {
    const { employeeId, establishmentId } = req.params;

    try {
        const removeEmployee = await Establishment.findByIdAndUpdate(
            establishmentId, { $pull: { employees: employeeId } }, { new: true }
        );
        res.status(200).json({ message: 'Funcionário removido com sucesso', establishment: removeEmployee });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao remover funcionário', error });
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

    // Normalizar o texto de busca para remover acentos
    const normalizedText = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Tenta converter o texto para número
    const numberText = Number(normalizedText);

    // Busca usando o operador $or para buscar o texto normalizado em vários campos
    const queryConditions = [
        { name: { $regex: normalizedText, $options: 'i' } },
        { description: { $regex: normalizedText, $options: 'i' } },
        { 'address.cep': { $regex: normalizedText, $options: 'i' } },
        { 'address.patio': { $regex: normalizedText, $options: 'i' } },
        { 'address.complement': { $regex: normalizedText, $options: 'i' } },
        { 'address.neighborhood': { $regex: normalizedText, $options: 'i' } },
        { 'address.city': { $regex: normalizedText, $options: 'i' } },
        { 'address.state': { $regex: normalizedText, $options: 'i' } },
        { 'services.name': { $regex: normalizedText, $options: 'i' } },
        { 'services.description': { $regex: normalizedText, $options: 'i' } }
    ];

    // Se o texto for um número válido, adiciona a busca no campo address.number
    if (!isNaN(numberText)) {
        queryConditions.push({ 'address.number': numberText });
    }

    // Executa a busca com o operador $or
    const establishments = await Establishment.find({
        $or: queryConditions
    });

    res.status(200).json(establishments);
});

// listar pelo id
const getEstablishmentById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const getEstablishment = await Establishment.findById(id);
        res.status(200).json(getEstablishment);
    } catch (error) {
        return res.status(404).json({ message: "Estabelecimento não encontrado." });
    }
});

// listar todos os funcionários de um estabelecimento
const getEmployeesByEstablishment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const employees = await Establishment
            .findById(id)
            .populate('employees', 'name email');
        res.status(200).json(employees.employees);
    } catch (error) {
        return res.status(404).json({ message: "Funcionários não encontrados." });
    }
});

//atualizar informações do estabelecimento
const updateEstablishment = asyncHandler(async (req, res) => {
    // id do estabelecimento
    const { id } = req.params;

    // enviar cep para a ViaCep para obter informações do endereço
    const { cep } = req.body;

    // se o cep for informado, buscar informações do endereço, senão, atualizar normalmente
    if (cep) {
        const findCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const cepData = await findCep.json();

        // se o cep não for encontrado, enviar mensagem de erro
        if (cepData.erro) {
            return res.status(400).json({ message: 'CEP não encontrado' });
        }

        // Função para remover acentos de uma string
        const removeAccents = (str) => {
            return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        };

        // Remover acentos dos campos do JSON recebido
        cepData.logradouro = removeAccents(cepData.logradouro);
        cepData.bairro = removeAccents(cepData.bairro);
        cepData.localidade = removeAccents(cepData.localidade);
        cepData.estado = removeAccents(cepData.uf);


        // campos do corpo da requisição
        const { 
            name, 
            description, 
            address: { 
                patio,
                complement,
                number, 
                neighborhood, 
                city, 
                state 
            }, 
            services } = req.body;

        // enviar resposta
        try {
            const updateEstablishment = await Establishment.findByIdAndUpdate(id, {
                name,
                description,
                address: {
                    cep: cepData.cep,
                    patio: cepData.logradouro,
                    complement,
                    number,
                    neighborhood: cepData.bairro,
                    city: cepData.localidade,
                    state: cepData.estado
                },
                services
            });
            res.status(200).json({ message: 'Estabelecimento atualizado com sucesso', establishment: updateEstablishment });
        } catch (error) {
            res.status(400).json({ message: 'Erro ao atualizar estabelecimento', error });
        }
    } else {
        // campos do corpo da requisição
        const { name, description, address: { patio, complement, number, neighborhood, city, state }, services } = req.body;

        // enviar resposta
        try {
            const updateEstablishment = await Establishment.findByIdAndUpdate(id, {
                name,
                description,
                address: {
                    patio,
                    complement,
                    number,
                    neighborhood,
                    city,
                    state
                },
                services
            });
            res.status(200).json({ message: 'Estabelecimento atualizado com sucesso', establishment: updateEstablishment });
        } catch (error) {
            res.status(400).json({ message: 'Erro ao atualizar estabelecimento', error });
        }
    }
});

// excluir estabelecimento
const deleteEstablishment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteEstablishment = await Establishment.findByIdAndDelete(id);
        res.status(200).json({ message: 'Estabelecimento excluído com sucesso', establishment: deleteEstablishment });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao excluir estabelecimento', error });
    }
})

// exportar funções de controle de estabelecimento
module.exports = {
    createEstablishment,
    getEstablishmentsByOwner,
    addEmployeeById,
    getEstablishmentById,
    getEstablishments,
    getEstablishmentsByText,
    removeEmployeeById,
    getEmployeesByEstablishment,
    updateEstablishment,
    deleteEstablishment
};