const router = require('express').Router()

const { getOneUser, updateUser } = require('../../controllers/user.controller')
const { isTokenValid } = require('../../middlewares/verifyToken.middleware')

const validation = require('../../middlewares/validation.middleware')
const { userSchemaMember } = require('../../schemas/updateuser.schema')

router.get('/', isTokenValid('MEMBER'), getOneUser)
router.patch(
    '/',
    isTokenValid('MEMBER'),
    validation(userSchemaMember),
    updateUser
)

module.exports = router
