import fs, { access, readdir, stat } from "fs/promises";
import { extname, join } from "path";
import sharp from "sharp";
import { optimize } from "svgo";

const RASTER_EXTENSIONS = [".png", ".jpg", ".jpeg"];
const VECTOR_EXTENSIONS = [".svg"];
const IMAGE_DIRS = ["src/assets", "public"];

async function* walk(dir) {
  const files = await readdir(dir);
  for (const file of files) {
    const pathToFile = join(dir, file);
    const stats = await stat(pathToFile);
    if (stats.isDirectory()) {
      yield* walk(pathToFile);
    } else {
      yield pathToFile;
    }
  }
}

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function optimizeSvg(filePath) {
  const svg = await fs.readFile(filePath, "utf8");
  const result = optimize(svg, {
    path: filePath,
    multipass: true,
    plugins: [
      "preset-default",
      "removeDimensions",
      {
        name: "removeViewBox",
        active: false,
      },
      {
        name: "removeEmptyAttrs",
        active: true,
      },
    ],
  });

  await fs.writeFile(filePath, result.data);
  return true;
}

async function processImage() {
  try {
    let estatisticas = {
      raster: {
        processados: 0,
        convertidos: 0,
        ignorados: 0,
      },
      svg: {
        processados: 0,
        otimizados: 0,
      },
    };

    for (const dir of IMAGE_DIRS) {
      for await (const filePath of walk(dir)) {
        const ext = extname(filePath).toLowerCase();

        // Processa imagens raster (PNG, JPG, JPEG)
        if (RASTER_EXTENSIONS.includes(ext)) {
          estatisticas.raster.processados++;
          const webpPath = filePath.replace(ext, ".webp");

          const webpExists = await fileExists(webpPath);

          if (!webpExists) {
            await sharp(filePath)
              .webp({
                quality: 80,
                effort: 6,
              })
              .toFile(webpPath);

            console.log(`✅ Convertido para WebP: ${filePath} -> ${webpPath}`);
            estatisticas.raster.convertidos++;
          } else {
            console.log(`⏭️  WebP já existe: ${filePath}`);
            estatisticas.raster.ignorados++;
          }
        }

        // Processa SVGs
        else if (VECTOR_EXTENSIONS.includes(ext)) {
          estatisticas.svg.processados++;
          try {
            await optimizeSvg(filePath);
            console.log(`🎨 SVG otimizado: ${filePath}`);
            estatisticas.svg.otimizados++;
          } catch (error) {
            console.error(`❌ Erro ao otimizar SVG ${filePath}:`, error);
          }
        }
      }
    }

    // Relatório detalhado
    console.log("\n📊 Relatório de Processamento:");
    console.log("\n🖼️  Imagens Raster (PNG, JPG, JPEG):");
    console.log(`🔍 Total processadas: ${estatisticas.raster.processados}`);
    console.log(`✨ Novas conversões WebP: ${estatisticas.raster.convertidos}`);
    console.log(
      `⏭️  Ignoradas (WebP já existe): ${estatisticas.raster.ignorados}`
    );

    console.log("\n🎨 Imagens Vetoriais (SVG):");
    console.log(`🔍 Total processadas: ${estatisticas.svg.processados}`);
    console.log(`✨ Otimizadas: ${estatisticas.svg.otimizados}`);

    console.log("\n🎉 Processo concluído!");
  } catch (error) {
    console.error("❌ Erro durante o processamento:", error);
  }
}

processImage();
