const mongoose = require("mongoose");

const adocaoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "Nome é obrigatório"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email é obrigatório"],
      trim: true,
      lowercase: true,
    },
    telefone: {
      type: String,
      required: [true, "Telefone é obrigatório"],
    },
    endereco: {
      type: String,
      required: [true, "Endereço é obrigatório"],
    },
    cidade: {
      type: String,
      required: [true, "Cidade é obrigatória"],
    },
    estado: {
      type: String,
      required: [true, "Estado é obrigatório"],
    },
    cep: {
      type: String,
      required: [true, "CEP é obrigatório"],
    },
    profissao: {
      type: String,
      required: [true, "Profissão é obrigatória"],
    },
    moradia: {
      type: String,
      required: [true, "Tipo de moradia é obrigatório"],
      enum: ["casa", "apartamento", "outro"],
    },
    moradiaPropria: {
      type: Boolean,
      required: [true, "Informação sobre moradia própria é obrigatória"],
    },
    possuiOutrosPets: {
      type: Boolean,
      required: [true, "Informação sobre outros pets é obrigatória"],
    },
    outrosPets: {
      type: String,
      required: function () {
        return this.possuiOutrosPets;
      },
    },
    motivoAdocao: {
      type: String,
      required: [true, "Motivo da adoção é obrigatório"],
    },
    experienciaComPets: {
      type: String,
      required: [true, "Experiência com pets é obrigatória"],
    },
    animal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Animal",
      required: [true, "Animal é obrigatório"],
    },
    status: {
      type: String,
      enum: ["pendente", "aprovado", "rejeitado", "concluido"],
      default: "pendente",
    },
    observacoes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Índices para melhorar a performance das buscas
adocaoSchema.index({ status: 1 });
adocaoSchema.index({ animal: 1 });

const Adocao = mongoose.model("Adocao", adocaoSchema);

module.exports = Adocao;
