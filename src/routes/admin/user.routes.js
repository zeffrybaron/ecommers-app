const router = require('express').Router()

const {
    getAllUsers,
    getOneUser,
    updateUser,
    deleteUser,
} = require('../../controllers/user.controller')
const { isTokenValid } = require('../../middlewares/verifyToken.middleware')

router.get('/', isTokenValid('ADMIN'), getAllUsers)
router.get('/:id', isTokenValid('MEMBER'), getOneUser)
router.patch('/:id', isTokenValid('MEMBER'), updateUser)
router.delete('/:id', isTokenValid('ADMIN'), deleteUser)

module.exports = router
