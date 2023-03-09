const joi = require('joi')

const createItemsSchema = joi.object({
    item_name: joi.string().min(4).required(),
    item_category: joi.string().required(),
    item_price: joi.number().required(),
    item_image: joi.string().required(),
})

module.exports = createItemsSchema
