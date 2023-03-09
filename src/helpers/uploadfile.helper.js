const multer = require('multer')
const path = require('path')
const NewError = require('./errorstack.helper')
const storage = multer.memoryStorage()

const upload = multer({
    storage,
    fileFilter: function (req, file, callback) {
        const ext = path.extname(file.originalname)

        const allowExtensions = ['.jpg', '.png', '.jpeg', '.gif']

        if (!allowExtensions.includes(ext)) {
            return callback(new NewError(400, 'file not allowed'), null)
        }
        callback(null, true)
    },
    limits: {
        fileSize: 1024 * 300,
    },
})

module.exports = upload
