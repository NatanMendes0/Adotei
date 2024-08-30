const mongoose = require("mongoose");

const passwordResetSchema = new mongoose.Schema(
  {
    userId: mongoose.Schema.Types.ObjectId,
    token: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Password-Reset", passwordResetSchema);