// chamar dependências
const mongoose = require('mongoose');

// criar o modelo de estabelecimento
var establishmentSchema = new mongoose.Schema({
    // campos do estabelecimento
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    address: {
        cep: {
            type: String,
            required: true,
        },
        patio: {
            type: String,
            required: true,
        },
        complement: {
            type: String,
            required: false,
        },
        number: {
            type: Number,
            required: true,
        },
        neighborhood: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
    },
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    animals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal',
    }],
    services: [{
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        isAvailable: {
            type: Boolean,
            required: true,
        },
        usersInterested: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
    }],
});

// Criar um índice de texto que inclui os campos relevantes para facilitar a busca de algum conteúdo
establishmentSchema.index({
    name: 'text',
    description: 'text',
    'address.cep': 'text',
    'address.patio': 'text',
    'address.neighborhood': 'text',
    'address.city': 'text',
    'address.state': 'text',
    'services.name': 'text',
    'services.description': 'text'
});

// exportar o modelo de estabelecimento
module.exports = mongoose.model('Establishment', establishmentSchema);