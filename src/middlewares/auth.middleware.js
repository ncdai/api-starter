import jwt from 'utils/jwt'
import User from 'models/user.model'

export const isAuthenticated = async (req, res, next) => {
  try {
    const userToken = req.headers.authorization
    if (!userToken) {
      return res.boom.badRequest('TOKEN_NOT_FOUND')
    }
    const jwtParsed = jwt.decode(userToken)
    if (!jwtParsed) {
      return res.boom.unauthorized('INVALID_TOKEN')
    }
    const user = await User.findOne({ _id: jwtParsed.key })
    if (!user) {
      return res.boom.unauthorized('USER_NOT_FOUND')
    }
    req.user = user
    next()
  } catch (error) {
    res.boom.badRequest(error.message)
  }
}
