import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import logger from 'morgan'
import boom from 'express-boom'
import config from './config'

// Routes
import { authRoute } from 'routes'

const app = express()

// Connect to MongoDB
mongoose.connect(
  config.MONGODB_URL,
  {
    useNewUrlParser: true
  }
)
mongoose.connection.on('connected', function () {
  console.log('Mongoose is connected')
})
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose is disconnected')
})
mongoose.connection.on('error', function (error) {
  console.log('Mongoose is encountered an error')
  console.log(error)
})

// Middlewares
// morgan
app.use(logger('dev'))
// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With, content-type, Authorization'
  )
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})
// bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(boom())

app.use('/auth', authRoute)

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'I\'m working!',
    env: config.ENV
  })
})

app.listen(config.PORT, () => {
  console.log(`App running on port ${config.PORT}`)
})
