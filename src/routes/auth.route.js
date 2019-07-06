import { Router } from 'express'
import { authController } from 'controllers'
import { isAuthenticated } from 'middlewares/auth.middleware'
import joiMiddleware from 'middlewares/joi.middleware'

import joi from '@hapi/joi'

const router = Router()

router.post(
  '/login',
  joiMiddleware({
    username: joi.string().required(),
    password: joi.string().required()
  }),
  authController.login
)

router.post(
  '/register',
  joiMiddleware({
    fullName: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().required()
  }),
  authController.register
)

router.get(
  '/me',
  isAuthenticated,
  authController.me
)

export default router
