const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Garantir que o diretório temporário existe
const tmpDir = "/tmp";
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir, { recursive: true });
}

// Configuração do armazenamento temporário
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("=== MULTER: DESTINATION ===");
    console.log("Arquivo recebido:", {
      fieldname: file.fieldname,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
    });
    cb(null, tmpDir);
  },
  filename: function (req, file, cb) {
    console.log("=== MULTER: FILENAME ===");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename =
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname);
    console.log("Nome do arquivo gerado:", filename);
    cb(null, filename);
  },
});

// Filtro para aceitar apenas imagens
const fileFilter = (req, file, cb) => {
  console.log("=== MULTER: FILE FILTER ===");
  console.log("Verificando arquivo:", {
    fieldname: file.fieldname,
    originalname: file.originalname,
    mimetype: file.mimetype,
  });

  if (file.mimetype.startsWith("image/")) {
    console.log("Arquivo aceito: é uma imagem");
    cb(null, true);
  } else {
    console.log("Arquivo rejeitado: não é uma imagem");
    cb(new Error("Apenas imagens são permitidas!"), false);
  }
};

// Configuração do multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// Adicionar handler de erro ao multer
const handleMulterError = (err, req, res, next) => {
  console.log("=== MULTER ERROR HANDLER ===");
  console.error("Erro no multer:", err);

  if (err instanceof multer.MulterError) {
    console.log("Erro específico do Multer:", err.code);
    return res.status(400).json({
      message: "Erro no upload do arquivo",
      error: err.message,
    });
  } else if (err) {
    console.log("Erro genérico:", err.message);
    return res.status(400).json({
      message: "Erro no processamento do arquivo",
      error: err.message,
    });
  }

  next();
};

module.exports = { upload, handleMulterError };
