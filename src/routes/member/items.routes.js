const router = require('express').Router()
const { getItems, getItemsId } = require('../../controllers/items.controllers')
const { isTokenValid } = require('../../middlewares/verifyToken.middleware')

router.get('/', isTokenValid('MEMBER'), getItems)
router.get('/:id', isTokenValid('MEMBER'), getItemsId)

module.exports = router
