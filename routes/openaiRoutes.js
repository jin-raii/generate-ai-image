const express = require('express')
const {editImage, generateImage, imageEdit} = require('../controller/openai_controller')
const router = express.Router()

router.post('/generateImage', generateImage)
router.post('/editimage', editImage)
router.post('/imageedit', imageEdit)

module.exports = router