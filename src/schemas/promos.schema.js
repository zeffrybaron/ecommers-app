const Joi = require('joi')

const promosSchema = Joi.object({
    promo_name: Joi.string().required(),
    promo_category: Joi.string().required(),
    promo_code: Joi.string().required(),
    promo_amount: Joi.number().required(),
})

module.exports = promosSchema
