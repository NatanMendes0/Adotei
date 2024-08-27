const jwt = require("jsonwebtoken");

const generateRefreshToken = (id) => {
  const refreshToken = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return refreshToken;
};

module.exports = { generateRefreshToken };
