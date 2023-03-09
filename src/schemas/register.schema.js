const Joi = require('joi')

const registerSchema = Joi.object({
    role: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    user_name: Joi.string().min(5).required(),
    name: Joi.string().required(),
    no_telephone: Joi.string().required(),
    alamat: Joi.string(),
})

module.exports = registerSchema
