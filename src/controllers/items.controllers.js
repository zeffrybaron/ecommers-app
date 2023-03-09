const { sequelize, Items } = require('../models')

const getItems = async(req, res, next) => {
    try {
        const resItems = await Items.findAll()
        if (resItems) {
            return res.status(200).json({
                message: 'success get items',
                data: resItems,
            })
        } else {
            throw { code: 404, message: 'Items not found' }
        }
    } catch (error) {
        next(error)
    }
}

const postItems = async(req, res, next) => {
    const {
        item_name,
        item_category,
        item_quantity,
        item_price,
        item_image,
        item_status,
    } = req.body

    try {
        await sequelize.transaction(async(trx) => {
            await Items.create({
                item_name,
                item_category,
                item_quantity,
                item_price,
                item_image,
                item_status,
            }, {
                transaction: trx,
            })
        })

        return res.status(201).json({
            message: 'success create items',
        })
    } catch (error) {
        next(error)
    }
}

const getItemsId = async(req, res, next) => {
    const { id } = req.params

    try {
        const resItems = await Items.findOne({ where: { id: id } })
        if (resItems) {
            return res.status(200).json({
                message: `success get items by id ${id}`,
                data: resItems,
            })
        } else {
            throw { code: 404, message: 'Item not found' }
        }
    } catch (error) {
        next(error)
    }
}

const updateItems = async(req, res, next) => {
    const { id } = req.params

    try {
        const findItem = await Items.findOne({
            where: { id: id },
        })

        if (!findItem) {
            throw { code: 404, message: 'Item not found' }
        }

        const itemUpdate = await Items.update(req.body, {
            where: { id: id },
        })

        if (itemUpdate) {
            return res.status(200).json({
                message: `success update items by id ${id}`,
            })
        } else {
            throw { code: 404, message: 'update item failed' }
        }
    } catch (error) {
        next(error)
    }
}

const deleteItems = async(req, res, next) => {
    const { id } = req.params

    try {
        const itemDelete = await Items.destroy({
            where: {
                id: id,
            },
        })

        if (itemDelete) {
            return res.status(200).json({
                message: `success delete items by id ${id}`,
            })
        } else {
            next(req)
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    postItems,
    getItems,
    getItemsId,
    updateItems,
    deleteItems,
}