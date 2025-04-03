const Animal = require("../models/animalModel");
const asyncHandler = require("express-async-handler");
const uploadService = require("../services/uploadService");

// @desc    Listar todos os animais
// @route   GET /api/animais
// @access  Public
const listarAnimais = asyncHandler(async (req, res) => {
  const { especie, status, tamanho } = req.query;
  const filter = {};

  if (especie) filter.especie = especie;
  if (status) filter.status = status;
  if (tamanho) filter.tamanho = tamanho;

  const animais = await Animal.find(filter)
    .populate("estabelecimento", "nome endereco cidade estado")
    .sort("-createdAt");

  res.json(animais);
});

// @desc    Buscar animal por ID
// @route   GET /api/animais/:id
// @access  Public
const buscarAnimalPorId = asyncHandler(async (req, res) => {
  const animal = await Animal.findById(req.params.id).populate(
    "estabelecimento",
    "nome endereco cidade estado"
  );

  if (!animal) {
    res.status(404);
    throw new Error("Animal não encontrado");
  }

  res.json(animal);
});

// @desc    Criar novo animal
// @route   POST /api/animais
// @access  Private
const criarAnimal = asyncHandler(async (req, res) => {
  console.log("=== INÍCIO DO PROCESSO DE CRIAÇÃO DE ANIMAL ===");
  console.log("Dados recebidos:", JSON.stringify(req.body, null, 2));
  console.log("Arquivos recebidos:", req.files ? req.files.length : 0);

  if (req.files && req.files.length > 0) {
    console.log("Detalhes dos arquivos:");
    req.files.forEach((file, index) => {
      console.log(`Arquivo ${index + 1}:`);
      console.log(`  - Nome original: ${file.originalname}`);
      console.log(`  - Nome do campo: ${file.fieldname}`);
      console.log(`  - Nome do arquivo: ${file.filename}`);
      console.log(`  - Caminho: ${file.path}`);
      console.log(`  - Tamanho: ${file.size} bytes`);
      console.log(`  - Tipo MIME: ${file.mimetype}`);
    });
  }

  let fotos = [];

  if (req.files && req.files.length > 0) {
    console.log("Iniciando upload de imagens...");
    try {
      console.log("Chamando uploadService.uploadMultipleFiles...");
      fotos = await uploadService.uploadMultipleFiles(req.files, "animais");
      console.log("Imagens enviadas com sucesso:", fotos);
    } catch (error) {
      console.error("Erro ao fazer upload das imagens:", error);
      console.error("Stack trace:", error.stack);
      res.status(500);
      throw new Error(`Erro ao fazer upload das imagens: ${error.message}`);
    }
  } else {
    console.log("Nenhuma imagem recebida");
  }

  try {
    console.log("Criando animal no banco de dados...");
    console.log("Dados a serem salvos:", {
      ...req.body,
      fotos,
      estabelecimento: req.body.estabelecimento || req.user.estabelecimento,
    });

    const animal = await Animal.create({
      ...req.body,
      fotos,
      estabelecimento: req.body.estabelecimento || req.user.estabelecimento,
    });

    console.log("Animal criado com sucesso:", JSON.stringify(animal, null, 2));
    console.log("=== FIM DO PROCESSO DE CRIAÇÃO DE ANIMAL ===");
    res.status(201).json(animal);
  } catch (error) {
    console.error("Erro ao criar animal no banco de dados:", error);
    console.error("Stack trace:", error.stack);
    res.status(500);
    throw new Error(`Erro ao criar animal: ${error.message}`);
  }
});

// @desc    Atualizar animal
// @route   PUT /api/animais/:id
// @access  Private
const atualizarAnimal = asyncHandler(async (req, res) => {
  const animal = await Animal.findById(req.params.id);

  if (!animal) {
    res.status(404);
    throw new Error("Animal não encontrado");
  }

  // Verificar se o usuário tem permissão para atualizar este animal
  if (
    animal.estabelecimento.toString() !== req.user.estabelecimento.toString()
  ) {
    res.status(403);
    throw new Error("Não autorizado a atualizar este animal");
  }

  let fotos = animal.fotos;

  if (req.files && req.files.length > 0) {
    fotos = await uploadService.uploadMultipleFiles(req.files, "animais");
  }

  const animalAtualizado = await Animal.findByIdAndUpdate(
    req.params.id,
    { ...req.body, fotos },
    { new: true, runValidators: true }
  );

  res.json(animalAtualizado);
});

// @desc    Deletar animal
// @route   DELETE /api/animais/:id
// @access  Private
const deletarAnimal = asyncHandler(async (req, res) => {
  const animal = await Animal.findById(req.params.id);

  if (!animal) {
    res.status(404);
    throw new Error("Animal não encontrado");
  }

  // Verificar se o usuário tem permissão para deletar este animal
  if (
    animal.estabelecimento.toString() !== req.user.estabelecimento.toString()
  ) {
    res.status(403);
    throw new Error("Não autorizado a deletar este animal");
  }

  await animal.deleteOne();

  res.json({ message: "Animal removido com sucesso" });
});

// @desc    Listar animais por estabelecimento
// @route   GET /api/animais/estabelecimento/:estabelecimentoId
// @access  Public
const listarAnimaisPorEstabelecimento = asyncHandler(async (req, res) => {
  const animais = await Animal.find({
    estabelecimento: req.params.estabelecimentoId,
  }).sort("-createdAt");

  res.json(animais);
});

module.exports = {
  listarAnimais,
  buscarAnimalPorId,
  criarAnimal,
  atualizarAnimal,
  deletarAnimal,
  listarAnimaisPorEstabelecimento,
};
