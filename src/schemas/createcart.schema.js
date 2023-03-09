const joi = require('joi')

const createCartSchema = joi.object({
    id_item: joi.number().required(),
    quantity: joi.number().required(),
})

module.exports = createCartSchema
