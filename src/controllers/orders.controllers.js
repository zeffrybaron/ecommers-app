const { Orders, OrderItems, Promos, Items, Carts, Payments } = require('../models/index')
const { sequelize } = require('../models')

const getAllOrder = async (req, res, next) => {
    try {
        let findAll = []
        if (req.role === 'MEMBER') {
            findAll = await Orders.findAll({
                include: [
                    {
                        model: OrderItems,
                        as: 'order_items',
                    },
                ],
                where: {
                    id_users: req.id_users,
                },
            })
        } else {
            findAll = await Orders.findAll({
                include: [
                    {
                        model: OrderItems,
                        as: 'order_items',
                    },
                ],
            })
        }

        if (!findAll) {
            throw {
                code: 404,
                message: 'Order is empty ',
            }
        }

        return res.status(200).json({
            message: 'success get orders',
            data: findAll,
        })
    } catch (error) {
        next(error)
    }
}

const createOrder = async (req, res, next) => {
    try {
        const { ...createOrder } = req.body
        const itemResult = []
        let findPromo = false
        let orderAmount = 0

        const findMyCart = await Carts.findAll({
            include: [
                {
                    model: Items,
                    as: 'cart',
                },
            ],
            where:{
                id_users: req.id_users, 
            }
        })

        if (findMyCart.length == 0) {
            throw {
                code: 404,
                message: 'Cart is empty'
            }
        }

        for (const result of findMyCart) {
            const { id_item, name, quantity } = result
            const findItem = await Items.findByPk(id_item)
            if (findItem) {
                const itemData = {
                    id_item: id_item,
                    item_name: name,
                    item_quantity: quantity,
                    item_price: result.cart.item_price,
                }
                itemResult.push(itemData)
                orderAmount += result.cart.item_price * quantity
            }
            else{
                throw {
                    code: 404,
                    message: 'Item not found',
                }
            }
        }

        if (req.body.promo) {
            findPromo = await Promos.findOne({
                where: {
                    promo_code: req.body.promo,
                },
            })

            if (!findPromo) {
                throw {
                    code: 404,
                    message: 'promo not founds',
                }
            }
            orderAmount -= findPromo.promo_amount
        }

        await sequelize.transaction(async (t) => {
            insertOrder = await Orders.create(
                {
                    ...createOrder,
                    id_users: req.id_users,
                    id_promo: findPromo?.id,
                    no_invoice: `INV-${Date.now()}`,
                    date_order: Date.now(),
                    total_price: orderAmount,
                    order_status: 'Pending',
                },
                {
                    transaction: t,
                }
            )
            await OrderItems.bulkCreate(
                itemResult.map((item) => {
                    return {
                        id_order: insertOrder.id,
                        id_item: item.id_item,
                        item_name: item.item_name,
                        item_price: item.item_price,
                        item_quantity: item.item_quantity,
                    }
                }),
                {
                    transaction: t,
                }
            )

            await Carts.destroy({
                where: {
                    id_users: req.id_users
                },
            })
        })
        return res.status(201).json({
            message: 'Create order has successful',
        })
    } catch (error) {
        next(error)
    }
}

const updateOrder = async (req, res, next) => {
    try {
        const id = req.params.id

        const findOrder = await Orders.findByPk(id)
        if (!findOrder) {
            throw {
                code: 404,
                message: 'Order not found',
            }
        }

        await findOrder.update(req.body)

        if (req.body.order_status == 'Cancel') {
            await Payments.destroy({
                where: {
                    id_orders: id
                },
            })
        }

        return res.status(200).json({
            message: 'Update order successful',
            data: findOrder,
        })
    } catch (error) {
        next(error)
    }
}

const deleteOrder = async (req, res, next) => {
    try {
        const id = req.params.id
        
        const findOrder = await Orders.findAll({
            where: { id: id },
        })

        if (!findOrder) {
            return res.status(404).json({
                message: 'Order not found',
            })
        }

        await Orders.destroy({
            where: {
                id: id,
            },
        })

        return res.status(200).json({
            message: 'Delete order successful',
        })
    } catch (error) {
        next(error)
    }
}

module.exports = { createOrder, updateOrder, deleteOrder, getAllOrder }