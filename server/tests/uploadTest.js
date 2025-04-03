const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

// Cores para o terminal
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

const API_URL = "http://localhost:5001/api";

// Função para logar com formatação
function logStep(step, message) {
  console.log(
    `\n${colors.bright}${colors.cyan}[${step}]${colors.reset} ${message}`
  );
}

function logSuccess(message, data = null) {
  console.log(`${colors.green}✓ ${message}${colors.reset}`);
  if (data) {
    console.log(JSON.stringify(data, null, 2));
  }
}

function logError(message, error) {
  console.error(`${colors.red}✗ ${message}${colors.reset}`);
  if (error.response?.data) {
    console.error(JSON.stringify(error.response.data, null, 2));
  } else {
    console.error(error.message);
  }
}

// Função para criar um usuário
async function criarUsuario() {
  logStep("1/5", "Criando usuário de teste...");
  try {
    const userData = {
      name: "Usuário Teste",
      email: "usuario.teste@example.com",
      password: "senha123",
      phone: "11999999999",
      cpf: "123.456.789-00",
      nickname: "usuario.teste",
    };

    console.log(`${colors.dim}Dados do usuário:${colors.reset}`);
    console.log(JSON.stringify(userData, null, 2));

    const response = await axios.post(`${API_URL}/usuarios/cadastro`, userData);
    logSuccess("Usuário criado com sucesso!", response.data);
    return response.data;
  } catch (error) {
    logError("Erro ao criar usuário", error);
    throw error;
  }
}

// Função para fazer login
async function fazerLogin(email, senha) {
  logStep("2/5", "Realizando login...");
  try {
    console.log(`${colors.dim}Credenciais:${colors.reset}`);
    console.log(`Email: ${email}`);
    console.log(`Senha: ${senha}`);

    const response = await axios.post(`${API_URL}/usuarios/login`, {
      email,
      password: senha,
    });
    logSuccess("Login realizado com sucesso!");
    console.log(
      `${colors.dim}Token JWT:${colors.reset} ${response.data.token.substring(
        0,
        20
      )}...`
    );
    return response.data.token;
  } catch (error) {
    logError("Erro no login", error);
    throw error;
  }
}

// Função para criar uma ONG
async function criarONG(token) {
  logStep("3/5", "Criando ONG de teste...");
  try {
    const ongData = {
      name: "ONG Teste",
      description: "ONG de teste para desenvolvimento",
      cep: "01001000",
      complement: "Sala 1",
      number: 123,
    };

    console.log(`${colors.dim}Dados da ONG:${colors.reset}`);
    console.log(JSON.stringify(ongData, null, 2));

    const response = await axios.post(
      `${API_URL}/estabelecimentos/cadastro`,
      ongData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    logSuccess("ONG criada com sucesso!", response.data);
    return response.data;
  } catch (error) {
    logError("Erro ao criar ONG", error);
    throw error;
  }
}

// Função para criar um animal com imagens
async function criarAnimalComImagens(token, estabelecimentoId) {
  logStep("4/5", "Criando animal com imagens...");
  try {
    const formData = new FormData();

    // Dados do animal
    const animalData = {
      nome: "Rex",
      especie: "cachorro",
      raca: "Labrador",
      idade: 2,
      sexo: "macho",
      tamanho: "grande",
      descricao: "Cachorro muito dócil e brincalhão",
      vacinado: true,
      castrado: true,
      vermifugado: true,
      estabelecimento: estabelecimentoId,
    };

    console.log(`${colors.dim}Dados do animal:${colors.reset}`);
    console.log(JSON.stringify(animalData, null, 2));

    // Adicionar dados ao formData
    Object.entries(animalData).forEach(([key, value]) => {
      // Converter valores booleanos para string
      if (typeof value === "boolean") {
        formData.append(key, value.toString());
      } else {
        formData.append(key, value);
      }
    });

    // Adicionar imagens
    const imagensPath = path.join(__dirname, "imagens");
    const imagens = fs.readdirSync(imagensPath);

    console.log(`${colors.dim}Imagens encontradas:${colors.reset}`);
    imagens.forEach((img) => console.log(`- ${img}`));

    console.log(`${colors.dim}Iniciando upload das imagens...${colors.reset}`);

    for (const imagem of imagens) {
      const filePath = path.join(imagensPath, imagem);
      console.log(`${colors.dim}Processando imagem: ${imagem}${colors.reset}`);

      try {
        // Criar um stream de leitura do arquivo
        const fileStream = fs.createReadStream(filePath);

        // Adicionar o arquivo ao FormData
        formData.append("fotos", fileStream, {
          filename: imagem,
          contentType: "image/jpeg",
        });

        console.log(
          `${colors.dim}Imagem ${imagem} adicionada ao FormData${colors.reset}`
        );
      } catch (error) {
        console.error(
          `${colors.red}Erro ao processar imagem ${imagem}:${colors.reset}`,
          error
        );
        throw error;
      }
    }

    console.log(
      `${colors.dim}Preparando requisição para o servidor...${colors.reset}`
    );
    console.log(`${colors.dim}Headers:${colors.reset}`, {
      ...formData.getHeaders(),
      Authorization: `Bearer ${token.substring(0, 20)}...`,
    });

    console.log(
      `${colors.dim}Enviando requisição para ${API_URL}/animais...${colors.reset}`
    );

    const response = await axios.post(`${API_URL}/animais`, formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${token}`,
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });
    logSuccess("Animal criado com sucesso!", response.data);
    return response.data;
  } catch (error) {
    logError("Erro ao criar animal", error);
    throw error;
  }
}

// Função para listar animais
async function listarAnimais() {
  logStep("5/5", "Listando todos os animais...");
  try {
    const response = await axios.get(`${API_URL}/animais`);
    logSuccess(`Encontrados ${response.data.length} animais!`, response.data);
    return response.data;
  } catch (error) {
    logError("Erro ao listar animais", error);
    throw error;
  }
}

// Função principal para executar o teste
async function executarTeste() {
  console.log(
    `\n${colors.bright}${colors.magenta}=== Iniciando teste de upload ===${colors.reset}\n`
  );
  try {
    // 1. Criar usuário
    const usuario = await criarUsuario();

    // 2. Fazer login
    const token = await fazerLogin(usuario.email, "senha123");

    // 3. Criar ONG
    const ong = await criarONG(token);

    // 4. Criar animal com imagens
    const animal = await criarAnimalComImagens(token, ong.establishment._id);

    // 5. Listar animais
    await listarAnimais();

    console.log(
      `\n${colors.bright}${colors.green}=== Teste concluído com sucesso! ===${colors.reset}\n`
    );
  } catch (error) {
    console.log(
      `\n${colors.bright}${colors.red}=== Teste falhou! ===${colors.reset}\n`
    );
  }
}

// Executar o teste
executarTeste();
