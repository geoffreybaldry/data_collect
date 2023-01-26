const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {
  upsertProviderVolume,
} = require('../controllers/providerVolumeController')

router.route('/').post(protect, upsertProviderVolume)

module.exports = router
