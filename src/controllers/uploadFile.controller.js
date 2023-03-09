const imagekit = require('../helpers/imagekit.helper')

const uploadFile = async(req, res, next) => {
    try {
        const resp = await imagekit.upload({
            file: req.file.buffer,
            fileName: `photo-${Date.now()}-${req.file.originalname}`,
            tags: ['photo'],
        })

        return res.status(200).json({
            message: 'success upload file',
            data: resp.url,
        })
    } catch (error) {
        next(error)
    }
}

module.exports = uploadFile