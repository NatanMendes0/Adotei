const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ongSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: null,
    },
    completedOnboarding: {
      type: Boolean,
      default: false,
    },
    auth: {
      refreshToken: String,
      loginAttempts: {
        type: Number,
        default: 0,
      },
      isBlocked: {
        type: Boolean,
        default: false,
      },
      lastLogin: Date,
      passwordChangeAt: Date,
      passwordResetToken: String,
      passwordResetExpires: Date,
    },
    contact: {
      number: [String],
      email: [String],
    },
    address: {
      cep: String,
      city: String,
      state: String,
      address: String,
      number: Number,
      complement: String,
    },
    openingHours: [
      {
        specialHour: {
          type: Boolean,
          default: false,
        },
        weekDays: [Number],
        opening: String,
        closing: String,
      },
    ],
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
    pets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
      },
    ],
  },
  { timestamps: true }
);

ongSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});

ongSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Ong", ongSchema);
