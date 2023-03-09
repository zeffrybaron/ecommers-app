const {
    getAllCart,
    createCart,
    updateCart,
    deleteCart,
} = require('../../controllers/carts.controller')
const createcartSchemas = require('../../schemas/createcart.schema')
const updatecartSchemas = require('../../schemas/updatecart.schema')
const validation = require('../../middlewares/validation.middleware')
const { isTokenValid } = require('../../middlewares/verifyToken.middleware')
const router = require('express').Router()

router.get('/', isTokenValid('MEMBER'), getAllCart)
router.post(
    '/',
    isTokenValid('MEMBER'),
    validation(createcartSchemas),
    createCart
)
router.patch(
    '/:id',
    isTokenValid('MEMBER'),
    validation(updatecartSchemas),
    updateCart
)
router.delete('/:id', isTokenValid('MEMBER'), deleteCart)

module.exports = router