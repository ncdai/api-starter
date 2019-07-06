import User from 'models/user.model'
import jwt from 'utils/jwt'

export const login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username })
  if (!user) {
    return res.boom.unauthorized('USER_NOT_FOUND')
  }
  if (!user.validPassword(req.body.password)) {
    return res.boom.unauthorized('WRONG_PASSWORD')
  }
  const token = jwt.encode({
    key: user._id
  })
  return res.json({
    token,
    user
  })
}

export const register = async (req, res) => {
  const user = await User.findOne({ username: req.body.username })
  if (user) {
    res.boom.badRequest('USER_EXISTS')
    return
  }
  const newUser = new User({
    fullName: req.body.fullName,
    username: req.body.username,
    password: req.body.password
  })
  newUser.password = newUser.generatePassword(newUser.password)
  const saveUser = await newUser.save()
  return res.json(saveUser)
}

export const me = async (req, res) => {
  res.json(req.user)
}

export default {
  login,
  register,
  me
}
