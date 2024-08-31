// chamar dependências
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

// chamar model
const PasswordReset = require('../models/passwordResetModel');

const handlePasswordReset = async (user, res) => {
    
    // Verificar se já existe uma solicitação de reset para esse usuário
    const request = await PasswordReset.findOne({ userId: user._id });

    if (request) {
        await PasswordReset.findByIdAndDelete(request._id);
    }

    // Gerar um UUID para o token de recuperação de senha
    let uuid = uuidv4();

    // Criar uma nova solicitação de reset de senha
    await PasswordReset.create({
        userId: user._id,
        token: uuid,
    });

    // Definir o transporte de e-mail
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL,
            pass: process.env.MAIL_PASSWORD,
            clientId: process.env.OAUTH_CLIENT_ID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN
        },
    });

    //TODO - criar um arquivo html com o corpo do e-mail
    // Definir as opções de e-mail
    let mailOptions = {
        from: process.env.EMAIL, 
        // to: user.email,
        to: "natancmendes@gmail.com",
        subject: 'Recuperação de Senha',
        text: `Olá ${user.name}! Para recuperar sua senha, clique no link a seguir: ${process.env.CLIENT_URL}/esqueceu-senha/${uuid}`,
    };

    // Enviar o e-mail com o token de recuperação de senha
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return res.status(500).json({ message: "Erro ao enviar e-mail!" });
        } else {
            return res.status(200).json({ message: "E-mail enviado com sucesso!" });
        }
    });
};

module.exports = { handlePasswordReset };
