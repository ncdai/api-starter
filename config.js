import dotenv from 'dotenv'

const getEnvFile = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return '.env'
    case 'production':
      return '.env.production'
    default:
      return '.env'
  }
}

dotenv.config({
  path: getEnvFile()
})

const config = {
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 3000,
  MONGODB_URL: process.env.MONGODB_URL,
  SECRET_KEY: process.env.SECRET_KEY
}

export default config
