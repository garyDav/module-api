import Joi from 'joi'

const pattern = /^[a-zA-Z0-9!-_.@#$%&*]{6,50}$/

export const authUserSchema = Joi.object({
  username: Joi.string().min(4).max(50).required(),
  password: Joi.string().regex(pattern).required(),
})
