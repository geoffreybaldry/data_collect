const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { upsertInstance } = require('../controllers/instanceController')

router.route('/').post(protect, upsertInstance)

module.exports = router
