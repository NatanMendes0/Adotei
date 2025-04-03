const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const { upload, handleMulterError } = require("../middleware/uploadMiddleware");
const {
  listarAnimais,
  buscarAnimalPorId,
  criarAnimal,
  atualizarAnimal,
  deletarAnimal,
  listarAnimaisPorEstabelecimento,
} = require("../controllers/animalController");

// Rotas públicas
router.get("/", listarAnimais);
router.get("/:id", buscarAnimalPorId);

// Rotas protegidas (requerem autenticação)
router.post(
  "/",
  authMiddleware,
  upload.array("fotos", 5),
  handleMulterError,
  criarAnimal
);
router.put(
  "/:id",
  authMiddleware,
  upload.array("fotos", 5),
  handleMulterError,
  atualizarAnimal
);
router.delete("/:id", authMiddleware, deletarAnimal);
router.get(
  "/estabelecimento/:estabelecimentoId",
  listarAnimaisPorEstabelecimento
);

module.exports = router;
