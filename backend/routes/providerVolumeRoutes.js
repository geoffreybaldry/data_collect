const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {
  upsertProviderVolume,
  getProviderVolumes,
} = require('../controllers/providerVolumeController')

router
  .route('/')
  .get(protect, getProviderVolumes)
  .post(protect, upsertProviderVolume)

module.exports = router
