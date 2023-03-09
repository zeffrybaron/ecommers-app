const joi = require('joi')

const userSchemaMember = joi.object({
    name: joi.string().min(10),
    no_telephone: joi.string().min(10),
    email: joi.string().email(),
    alamat: joi.string(),
    password: joi.string().min(8),
})

const userSchemaAdmin = joi.object({
    role: joi.string(),
    name: joi.string().min(10),
    no_telephone: joi.string().min(10),
    email: joi.string().email(),
    alamat: joi.string(),
    password: joi.string().min(8),
})

module.exports = { userSchemaMember, userSchemaAdmin }
