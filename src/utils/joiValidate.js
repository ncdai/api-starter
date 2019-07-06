import joi from '@hapi/joi'
import _ from 'lodash'

// Joi validation options
const defaultOptions = {
  abortEarly: true // abort after the last validation error
  // allowUnknown: true, // allow unknown keys that will be ignored
  // stripUnknown: true // remove unknown keys from the validated data
}

const joiValidate = (schema, data, options = {}) => {
  return new Promise((resolve, reject) => {
    const joiOptions = _.assign(defaultOptions, options)
    joi.validate(data, schema, joiOptions, (err, value) => {
      if (err) {
        // Joi Error
        const joiError = {
          message: {
            original: err._object,
            // Fetch only message and type from each error
            details: _.map(err.details, ({ message, type }) => ({
              message: message.replace(/['"]/g, ''),
              type
            }))
          }
        }
        throw joiError
      } else {
        resolve(data)
      }
    })
  })
}

export default joiValidate
