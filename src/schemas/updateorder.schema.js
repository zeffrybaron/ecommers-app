const joi = require('joi')

const orderSchema = joi.object({
    order_status: joi.string().valid('Cancel'),
})

module.exports = orderSchema
