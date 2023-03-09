const router = require('express').Router()
const {
    getItems,
    postItems,
    getItemsId,
    updateItems,
    deleteItems,
} = require('../../controllers/items.controllers')
const validation = require('../../middlewares/validation.middleware')
const { isTokenValid } = require('../../middlewares/verifyToken.middleware')
const itemsSchema = require('../../schemas/createitems.schema')

router.get('/', isTokenValid('ADMIN'), getItems)
router.get('/:id', isTokenValid('ADMIN'), getItemsId)
router.post('/', isTokenValid('ADMIN'), validation(itemsSchema), postItems)
router.put('/:id', isTokenValid('ADMIN'), updateItems)
router.delete('/:id', isTokenValid('ADMIN'), deleteItems)

module.exports = router
