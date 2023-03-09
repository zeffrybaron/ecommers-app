// const { sequelize, OrderItems } = require('../models')

// const getOrderItems = async(req, res, next) => {
//     console.log('getORDERITEMS', req)

//     try {
//         const resItems = await OrderItems.findAll()
//         if (resItems !== 0) {
//             return res.status(200).json({
//                 message: 'success get Order Items',
//                 data: resItems,
//             })
//         } else {
//             next(req)
//         }
//     } catch (error) {
//         next(error)
//     }
// }

// const postOrderItems = async(req, res, next) => {
//     console.log('postORDERITEMS', req)
//     const { id_items, id_order, item_name, item_quantity, item_price } =
//     req.body

//     try {
//         await sequelize.transaction(async(trx) => {
//             await OrderItems.create({
//                 id_items,
//                 id_order,
//                 item_name,
//                 item_quantity,
//                 item_price,
//             }, {
//                 transaction: trx,
//             })
//         })

//         return res.status(201).json({
//             message: 'success create order items',
//         })
//     } catch (error) {
//         next(error)
//     }
// }

// const getOrderItemsId = async(req, res, next) => {
//     console.log('getOrderITEMSbyId', req.params)
//     const { id } = req.params

//     try {
//         const resOrderItems = await OrderItems.findOne({ where: { id: id } })
//         if (resOrderItems !== 0) {
//             return res.status(200).json({
//                 message: `success get order item by id ${id}`,
//                 data: [resItems],
//             })
//         } else {
//             next(req)
//         }
//     } catch (error) {
//         next(error)
//     }
// }

// const updateOrderItems = async(req, res, next) => {
//     console.log('getOrderITEMS', req.params)
//     const { id } = req.params

//     try {
//         const OrderItemUpdate = await OrderItems.update(req.body, {
//             where: { id: id },
//         })

//         if (OrderItemUpdate !== 0) {
//             return res.status(200).json({
//                 message: `success update Order Item by id ${id}`,
//             })
//         } else {
//             next(req)
//         }
//     } catch (error) {
//         next(error)
//     }
// }

// const deleteOrderItems = async(req, res, next) => {
//     console.log('getITEMS', req.params)
//     const { id } = req.params

//     try {
//         const OrderItemDelete = await OrderItems.destroy({
//             where: {
//                 id: id,
//             },
//         })

//         if (OrderItemDelete !== 0) {
//             return res.status(200).json({
//                 message: `success delete order items by id ${id}`,
//             })
//         } else {
//             next(req)
//         }
//     } catch (error) {
//         next(error)
//     }
// }

// module.exports = {
//     postOrderItems,
//     getOrderItems,
//     getOrderItemsId,
//     updateOrderItems,
//     deleteOrderItems,
// }