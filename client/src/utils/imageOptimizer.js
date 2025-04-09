/**
 * Otimiza uma imagem antes do upload
 * @param {File} file - Arquivo de imagem original
 * @param {Object} options - Opções de otimização
 * @param {number} options.maxWidth - Largura máxima da imagem (default: 1920)
 * @param {number} options.quality - Qualidade da imagem (0-100, default: 80)
 * @returns {Promise<Blob>} - Retorna um Blob da imagem otimizada
 */
export const optimizeImage = async (file, options = {}) => {
  const { maxWidth = 1920, quality = 80 } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Redimensiona mantendo a proporção se a largura for maior que maxWidth
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Converte para Blob com a qualidade especificada
        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          "image/webp",
          quality / 100
        );
      };

      img.onerror = (error) => {
        reject(error);
      };
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};
