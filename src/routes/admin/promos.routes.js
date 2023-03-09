const router = require('express').Router()
const {
    createPromos,
    updatePromos,
    deletePromos,
    getPromos,
    getaPromo,
} = require('../../controllers/promos.controller')

const { isTokenValid } = require('../../middlewares/verifyToken.middleware')
const validation = require('../../middlewares/validation.middleware')
const promosSchema = require('../../schemas/promos.schema')

router.get('/', isTokenValid('ADMIN'), getPromos)
router.get('/:id', isTokenValid('ADMIN'), getaPromo)
router.post('/', isTokenValid('ADMIN'), validation(promosSchema), createPromos)
router.patch('/:id', isTokenValid('ADMIN'), updatePromos)
router.delete('/:id', isTokenValid('ADMIN'), deletePromos)

module.exports = router
