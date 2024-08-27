require("dotenv").config();

// chamar dependências
const express = require('express');
const dbConnect = require("./config/dbConnect");
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const bodyParser = require('body-parser');

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

// importação das rotas
const authRouter = require('./routes/authRouter');

// chamar as rotas
app.use('/api/user', authRouter);

// inicialização do servidor na porta 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Escutando na porta ${PORT}`);
});