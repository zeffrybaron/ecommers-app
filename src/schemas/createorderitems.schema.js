const joi = require("joi")

const createOrderItemsSchema = joi.object({
    id_item: joi.number().required(),
    id_order: joi.number().required(),
    item_name: joi.string().min(4).required(),
    item_quantity:  joi.number().required(),
    item_price:  joi.number().required()
})

module.exports = createOrderItemsSchema