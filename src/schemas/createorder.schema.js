const joi = require('joi')

const orderSchema = joi.object({
    promo: joi.string(),
    customer_name: joi.string().required(),
    sender_addres: joi.string().min(10).required(),
    receiver_addres: joi.string().min(10).required()
})

module.exports = orderSchema
