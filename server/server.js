require("dotenv").config();

// chamar dependências
const express = require("express");
const dbConnect = require("./config/dbConnect");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");

// conectar ao banco de dados
dbConnect();

// inicialização do servidor
const app = express();

// utilzar o cookie parser para aceitar cookies
app.use(cookieParser());

// utilização do helmet para aceitar varios tipos de cabeçalhos
app.use(helmet());

// middleware para aceitar requisições POST
app.use(bodyParser.json());

// Configuração do CORS
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:3000",
  "https://adotei.andreybernardoni.tech",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Permitir requisições sem origin (como mobile apps ou curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = "A política de CORS não permite acesso deste origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// importação das rotas
const authRouter = require("./routes/authRouter");

// Criar um router principal para /api
const apiRouter = express.Router();

// Agrupar todas as rotas sob /api
apiRouter.use("/auth", authRouter);

// Rota de teste
apiRouter.get("/ping", (req, res) => {
  res.send("pong! :D");
});

// Usar o router principal
app.use("/api", apiRouter);

// inicialização do servidor na porta 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});
