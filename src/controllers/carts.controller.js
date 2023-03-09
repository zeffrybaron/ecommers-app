const { sequelize, Carts, Items } = require('../models')

const createCart = async (req, res, next) => {
    try {
        const { id_item, quantity } = req.body
        const findItem = await Items.findByPk(req.body.id_item)
        if (!findItem) {
            throw {
                code: 404,
                message: 'Item not found',
            }
        }

        await sequelize.transaction(async (t) => {
            insertCart = await Carts.create(
                {
                    id_users: req.id_users,
                    id_item: id_item,
                    quantity: quantity,
                    name: findItem.item_name,
                    price: findItem.item_price,
                },
                {
                    transaction: t,
                }
            )
        })

        return res.status(201).json({
            message: 'Create cart has successful',
        })
    } catch (error) {
        next(error)
    }
}

const getAllCart = async (req, res, next) => {
    try {
        const findAll = await Carts.findAll({
            include: [
                {
                    model: Items,
                    as: 'cart',
                },
            ],
            where: {
                id_users: req.id_users,
            },
        })

        if (findAll.length == 0) {
            throw {
                code: 404,
                message: 'Cart is empty',
            }
        }

        return res.status(200).json({
            message: 'success get Cart',
            data: findAll,
        })
    } catch (error) {
        next(error)
    }
}

const updateCart = async (req, res, next) => {
    try {
        const id = req.params.id

        const findCart = await Carts.findByPk(id)
        if (!findCart) {
            throw {
                code: 404,
                message: 'Cart not found',
            }
        }

        await findCart.update(req.body)

        return res.status(200).json({
            message: 'Update cart success',
            data: findCart,
        })
    } catch (error) {
        next(error)
    }
}

const deleteCart = async (req, res, next) => {
    try {
        const id = req.params.id
        const findCart = await Carts.findByPk(id)

        if (!findCart) {
            throw {
                code: 404,
                message: 'Cart not found',
            }
        }

        await findCart.destroy()

        return res.status(200).json({
            message: 'Delete cart success',
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createCart,
    getAllCart,
    updateCart,
    deleteCart,
}
