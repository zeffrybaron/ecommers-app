const { sequelize, Promos } = require('../models')
const { Op } = require('sequelize')

const getPromos = async (req, res, next) => {
    try {
        const resPromos = await Promos.findAll()
        if (resPromos.length > 0) {
            return res.status(200).json({
                message: 'Success get all promos',
                data: resPromos,
            })
        }

        throw {
            code: 404,
            message: 'Promos not found',
        }
    } catch (error) {
        next(error)
    }
}

const getaPromo = async (req, res, next) => {
    try {
        const id = req.params.id
        const findOne = await Promos.findByPk(req.params.id)
        if (findOne) {
            return res.status(200).json({
                message: 'Success get promo',
                data: findOne,
            })
        }

        throw {
            code: 404,
            message: 'Promo not found',
        }
    } catch (error) {
        next(error)
    }
}

const createPromos = async (req, res, next) => {
    try {
        const { ...createPromo } = req.body
        const findCode = await Promos.findOne({
            where: {
                promo_code: createPromo.promo_code,
            },
        })

        if (findCode) {
            throw {
                code: 409,
                message: 'Promo code is exist',
            }
        }

        await sequelize.transaction(async (trx) => {
            await Promos.create(
                {
                    ...createPromo,
                },
                {
                    transaction: trx,
                }
            )
        })

        return res.status(201).json({
            message: 'Success create promo',
        })
    } catch (error) {
        next(error)
    }
}

const updatePromos = async (req, res, next) => {
    try {
        const findOnePromo = await Promos.findByPk(req.params.id)
        const findCode = await Promos.findOne({
            where: {
                promo_code: req.body.promo_code,
                id: {
                    [Op.notIn]: [req.params.id],
                },
            },
        })

        if (findCode) {
            throw {
                code: 409,
                message: 'Promo code is exist',
            }
        }

        if (findOnePromo) {
            await findOnePromo.update(req.body)
            return res.status(200).json({
                message: 'Update promo success',
            })
        }

        throw {
            code: 404,
            message: 'Promo not found',
        }
    } catch (error) {
        next(error)
    }
}

const deletePromos = async (req, res, next) => {
    try {
        const findOnePromo = await Promos.findByPk(req.params.id)
        if (findOnePromo) {
            await findOnePromo.destroy()
            return res.status(200).json({
                message: 'Delete promo success',
            })
        }

        throw {
            code: 404,
            message: 'Promo not found',
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getPromos,
    getaPromo,
    createPromos,
    updatePromos,
    deletePromos,
}
