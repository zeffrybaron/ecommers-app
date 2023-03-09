const joi = require('joi')

const createCartSchema = joi.object({
    id_item: joi.number(),
    quantity: joi.number(),
})

module.exports = createCartSchema
