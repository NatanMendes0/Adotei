const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "Nome do animal é obrigatório"],
      trim: true,
    },
    especie: {
      type: String,
      required: [true, "Espécie é obrigatória"],
      enum: ["cachorro", "gato", "outro"],
    },
    raca: {
      type: String,
      required: [true, "Raça é obrigatória"],
    },
    idade: {
      type: Number,
      required: [true, "Idade é obrigatória"],
    },
    sexo: {
      type: String,
      required: [true, "Sexo é obrigatório"],
      enum: ["macho", "fêmea"],
    },
    tamanho: {
      type: String,
      required: [true, "Tamanho é obrigatório"],
      enum: ["pequeno", "médio", "grande"],
    },
    descricao: {
      type: String,
      required: [true, "Descrição é obrigatória"],
    },
    fotos: [
      {
        type: String,
        required: [true, "Pelo menos uma foto é obrigatória"],
      },
    ],
    vacinado: {
      type: Boolean,
      default: false,
    },
    castrado: {
      type: Boolean,
      default: false,
    },
    vermifugado: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["disponivel", "em_processo", "adotado"],
      default: "disponivel",
    },
    estabelecimento: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Establishment",
      required: [true, "Estabelecimento é obrigatório"],
    },
  },
  {
    timestamps: true,
  }
);

// Índices para melhorar a performance das buscas
animalSchema.index({ especie: 1, status: 1 });
animalSchema.index({ estabelecimento: 1 });

const Animal = mongoose.model("Animal", animalSchema);

module.exports = Animal;
