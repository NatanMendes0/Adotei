const mongoose = require('mongoose')

const validateMongoDbID = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id)
  if (!isValid) throw new Error('ID inválido ou não existente.')
}

module.exports = validateMongoDbID 
