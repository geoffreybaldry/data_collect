const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { upsertVolume, getVolumes } = require('../controllers/volumeController')

// router.post('/', upsertVolume)
// router.get('/', getVolumes)

router.route('/').get(protect, getVolumes).post(protect, upsertVolume)

module.exports = router
