const {
    createOrder,
    updateOrder,
    getAllOrder,
    deleteOrder,
} = require('../../controllers/orders.controllers')

const validation = require('../../middlewares/validation.middleware')
const orderSchema = require('../../schemas/createorder.schema')
const orderUpdateSchema = require('../../schemas/updateorder.schema')
const { isTokenValid } = require('../../middlewares/verifyToken.middleware')
const router = require('express').Router()

router.get('/', isTokenValid('MEMBER'), getAllOrder)
router.post('/', isTokenValid('MEMBER'), validation(orderSchema), createOrder)
router.patch(
    '/:id',
    isTokenValid('MEMBER'),
    validation(orderUpdateSchema),
    updateOrder
)
router.delete('/:id', isTokenValid('MEMBER'), deleteOrder)



module.exports = router