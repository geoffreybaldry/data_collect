const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { upsertNode } = require('../controllers/nodeController')

router.route('/').post(protect, upsertNode)

module.exports = router
