const { PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs").promises;
const r2Client = require("../config/r2Config");

class UploadService {
  constructor() {
    this.bucket = process.env.R2_BUCKET_NAME;
  }

  async uploadFile(file, folder = "") {
    console.log(`=== INÍCIO DO UPLOAD DE ARQUIVO: ${file.filename} ===`);
    console.log("Dados do arquivo:", {
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,
    });

    try {
      // Verificar se o arquivo existe
      if (!file || !file.path) {
        console.error("Arquivo inválido ou não encontrado");
        throw new Error("Arquivo inválido ou não encontrado");
      }

      // Verificar se o arquivo existe no sistema de arquivos
      try {
        const stats = await fs.stat(file.path);
        console.log(
          `Arquivo encontrado no sistema de arquivos. Tamanho: ${stats.size} bytes`
        );
      } catch (error) {
        console.error(
          `Erro ao verificar arquivo no sistema de arquivos: ${error.message}`
        );
        throw new Error(
          `Arquivo não encontrado no sistema de arquivos: ${error.message}`
        );
      }

      // Ler o arquivo como Buffer
      console.log("Lendo arquivo como Buffer...");
      const fileContent = await fs.readFile(file.path);
      console.log(
        `Arquivo lido com sucesso. Tamanho do buffer: ${fileContent.length} bytes`
      );

      // Verificar se o conteúdo é um Buffer válido
      if (!Buffer.isBuffer(fileContent)) {
        console.error("Conteúdo do arquivo não é um Buffer válido");
        throw new Error("Conteúdo do arquivo inválido");
      }

      const key = folder ? `${folder}/${file.filename}` : file.filename;
      console.log(`Chave do arquivo no R2: ${key}`);

      console.log(`Enviando arquivo ${file.filename} para o R2...`);
      console.log(`Tamanho do arquivo: ${fileContent.length} bytes`);
      console.log(`Tipo MIME: ${file.mimetype}`);

      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: fileContent,
        ContentType: file.mimetype,
      });

      console.log("Comando PutObjectCommand criado:", {
        Bucket: this.bucket,
        Key: key,
        ContentType: file.mimetype,
      });

      console.log("Enviando comando para o R2...");
      await r2Client.send(command);
      console.log(`Arquivo ${file.filename} enviado com sucesso para o R2`);

      // Limpar arquivo temporário
      console.log(`Removendo arquivo temporário: ${file.path}`);
      await fs.unlink(file.path);
      console.log(`Arquivo temporário ${file.path} removido`);

      // Retornar URL do arquivo
      const url = `${process.env.R2_PUBLIC_URL}/${key}`;
      console.log(`URL do arquivo: ${url}`);
      console.log(`=== FIM DO UPLOAD DE ARQUIVO: ${file.filename} ===`);
      return url;
    } catch (error) {
      console.error(`Erro ao fazer upload do arquivo ${file.filename}:`, error);
      console.error("Stack trace:", error.stack);

      // Limpar arquivo temporário em caso de erro
      try {
        if (file && file.path) {
          console.log(
            `Tentando remover arquivo temporário após erro: ${file.path}`
          );
          await fs.unlink(file.path);
          console.log(`Arquivo temporário ${file.path} removido após erro`);
        }
      } catch (unlinkError) {
        console.error("Erro ao deletar arquivo temporário:", unlinkError);
      }
      throw error;
    }
  }

  async uploadMultipleFiles(files, folder = "") {
    console.log(
      `=== INÍCIO DO UPLOAD DE MÚLTIPLOS ARQUIVOS (${files.length}) ===`
    );
    console.log(`Pasta de destino: ${folder || "raiz"}`);

    const uploadPromises = files.map((file, index) => {
      console.log(
        `Iniciando upload do arquivo ${index + 1}/${files.length}: ${
          file.filename
        }`
      );
      return this.uploadFile(file, folder);
    });

    try {
      const results = await Promise.all(uploadPromises);
      console.log(
        `Todos os ${files.length} arquivos foram enviados com sucesso`
      );
      console.log(`=== FIM DO UPLOAD DE MÚLTIPLOS ARQUIVOS ===`);
      return results;
    } catch (error) {
      console.error(
        `Erro ao fazer upload de múltiplos arquivos: ${error.message}`
      );
      console.error("Stack trace:", error.stack);
      throw error;
    }
  }
}

module.exports = new UploadService();
