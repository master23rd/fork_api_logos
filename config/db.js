const mongoose = require('mongoose')

//clouser
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI)
  console.log(`mongodb connect: ${conn.connection.host}`)
}

module.exports = connectDB
