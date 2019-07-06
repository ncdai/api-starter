import joiValidate from 'utils/joiValidate'

const joiMiddleware = (scheme, options = {}) => {
  return async (req, res, next) => {
    try {
      await joiValidate(scheme, req.body, options)
      return next()
    } catch (error) {
      res.boom.notAcceptable('null', error)
    }
  }
}

export default joiMiddleware
