const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')

//routes
const auth = require('./routes/v1/auth')

//local import
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')

//env config
dotenv.config({ path: './config/config.env' })

//database & express
connectDB()
const app = express()

//logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//cors, parser and static folder
app.use(cors())
app.use(bodyParser.json({ limit: '500mb', type: 'application/json' }))
app.use(bodyParser.urlencoded({ limit: '256mb', extended: true }))
app.use('/api', express.static(path.join(__dirname, 'public')))

//routes and middleware handler
app.use('/api/v1/auth', auth)
app.use(errorHandler)

//listen port
const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(`running in ${process.env.NODE_ENV} mode on port : ${PORT}`)
)
