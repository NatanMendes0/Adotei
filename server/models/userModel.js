// chamar dependências
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// TODO: usar crypto para resetar a senha!

// criar o modelo de usuário
var userSchema = new mongoose.Schema(
    {
        // campos do usuário
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        nickname: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        establishmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Establishment',
            default: null,
        },
        role: {
            type: String,
            default: 'Comum',
        },

        // campos para segurança
        isBlocked: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
        },
        loginAttempts: {
            type: Number,
            required: true,
            default: 0,
        },
        passwordChangeAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
    },
    { timestamps: true }
);

// importar bcrypt e criptografar a senha
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        this.nickname = this.nickname.trim();
        this.nickname = this.nickname.replace(/\s+/g, "");
        next()
    }
    const salt = await bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// exportar o modelo de usuário
module.exports = mongoose.model('User', userSchema);