const { response } = require('express')
const { verify } = require('jsonwebtoken')
const { sequelize, Orders, Payments } = require('../models')

const postPayments = async(req, res, next) => {
    try {
        const { id_orders, payment_type, amount } = req.body
        const [isOrderExist] = await Promise.all([
            Orders.findOne({ where: { id: id_orders } }),
        ])

        if (!isOrderExist) {
            return res.status(404).json({
              message: 'Order not exist'
            });
        }
        if (isOrderExist.order_status === 'Paid') {
            throw {
                code: 400,
                message: 'YOUR ORDERS HAVE PAID',
            }
        }

        if(Number(isOrderExist.total_price) !== Number(amount)) {
            throw {
                code: 400,
                message: 'Your Amount not suit'
            }
        }

        try {

            const dataPayment = {
                id_orders: id_orders,
                payment_date: Date.now(),
                payment_type: payment_type,
                amount: isOrderExist.total_price,
                payment_status: 'PAID',
            }

            await Payments.create(dataPayment)
                .then((data) => {
                    res.status(201).json({
                        message: 'Your Payment Has Successful',
                    })
                })
                .catch((err) => {
                    res.status(500).send({ message: err.message })
                })
            await Orders.update({
                order_status: "Paid"
            }, {
                where: { id: id_orders, }
            })
        } catch (error) {
            console.log('error', error)
            next(error)
        }
    } catch (error) {
        next(error)
    }
}

const updatePayments = async(req, res, next) => {
    const { id } = req.params

    try {
        const paymentsUpdate = await Payments.update(req.body, {
            where: { id: id },
        })

        if (paymentsUpdate !== 0) {
            return res.status(200).json({
                message: `success update payment by id ${id}`,
            })
        } else {
            next(req)
        }
    } catch (error) {
        next(error)
    }
}

const deletePayments = async(req, res, next) => {
    const { id } = req.params

    try {
        const paymentsDelete = await Payments.destroy({
            where: {
                id: id,
            },
        })

        if (paymentsDelete !== 0) {
            return res.status(200).json({
                message: `success delete payment`,
            })
        } else {
            next(req)
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { postPayments, updatePayments, deletePayments }