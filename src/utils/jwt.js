import jwt from 'jsonwebtoken'
import config from '../../config'

export const encode = (data) => {
  const token = jwt.sign(
    data,
    config.SECRET_KEY,
    {
      expiresIn: '30d'
    }
  )
  return token
}

export const decode = (token) => {
  try {
    const data = jwt.verify(
      token,
      config.SECRET_KEY
    )
    return data
  } catch (error) {
    return null
  }
}

export default {
  encode,
  decode
}
