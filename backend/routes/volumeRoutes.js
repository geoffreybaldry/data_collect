const express = require('express')
const router = express.Router()
const { upsertVolume } = require('../controllers/volumeController')

router.post('/', upsertVolume)

module.exports = router
