const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { upsertVolumeBackup } = require('../controllers/volumeBackupController')

router.route('/').post(protect, upsertVolumeBackup)

module.exports = router
