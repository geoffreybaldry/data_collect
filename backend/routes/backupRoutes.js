const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { upsertBackup } = require('../controllers/backupController')

router.route('/').post(protect, upsertBackup)

module.exports = router
