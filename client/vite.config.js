import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      // Configurações de otimização por tipo de imagem
      png: {
        // Configurações do sharp para PNG
        quality: 80, // Qualidade da imagem (0-100)
        compressionLevel: 9, // Nível de compressão (0-9)
        effort: 10, // Esforço de otimização (1-10)
      },
      jpeg: {
        // Configurações do sharp para JPEG
        quality: 80, // Qualidade da imagem (0-100)
        progressive: true, // Carregamento progressivo
      },
      jpg: {
        // Configurações do sharp para JPG
        quality: 80,
        progressive: true,
      },
      webp: {
        // Configurações do sharp para WebP
        lossless: false, // Usar compressão com perdas
        quality: 80,
        effort: 6, // Esforço de otimização (0-6)
      },
    }),
  ],
});
