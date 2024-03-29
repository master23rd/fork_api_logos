const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')

const connectDB = require('./config/db')

//register config .env
dotenv.config({ path: './config/config.env' })

//connectdb immediately
connectDB()

//routes express - clouser
const app = express()

//direct routes
app.get('test', (req, res) => {
  res.send('testing')
})

//logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//routes initial
const auth = require('./routes/auth')

//middleware routes
app.use('/api/v1/auth', auth)

const PORT = process.env.PORT || 5000
const server = app.listen(
  PORT,
  console.log(`running in ${process.env.NODE_ENV} mode on port : ${PORT}`)
)
