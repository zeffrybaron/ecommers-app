const uploadFile = require('../../controllers/uploadFile.controller')
const upload = require('../../helpers/uploadfile.helper')
const { isTokenValid } = require('../../middlewares/verifyToken.middleware')

const router = require('express').Router()

router.post('/', isTokenValid('ADMIN'), upload.single('photo'), uploadFile)

module.exports = router