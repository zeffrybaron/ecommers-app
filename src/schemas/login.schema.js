const Joi = require('joi')

const loginSchema = Joi.object({
    password: Joi.string().required(),
    user_name: Joi.string().required(),
})

module.exports = loginSchema
