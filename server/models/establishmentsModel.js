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
    address: [{
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
    }]
});

// exportar o modelo de estabelecimento
module.exports = mongoose.model('Establishment', establishmentSchema);