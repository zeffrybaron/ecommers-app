const joi = require("joi")

const createPaymentSchema = joi.object({
    id_orders: joi.number().required(),
    payment_type:  joi.string().required(),
    amount:  joi.number().required(),
})

module.exports = createPaymentSchema