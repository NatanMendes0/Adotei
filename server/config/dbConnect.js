
const { default: mongoose } = require('mongoose')

const dbConnect = () => {
  try {
    mongoose.set('strictQuery', false)
    const conn = mongoose.connect(process.env.MONGODB_URL)

    if (conn) console.log('Conectado ao banco de dados!')
  } catch (error) {
    console.log('Database error: ', error)
  }
}

module.exports = dbConnect
