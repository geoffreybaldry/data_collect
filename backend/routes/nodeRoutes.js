const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { upsertNode, getNodes } = require('../controllers/nodeController')

router.route('/').get(protect, getNodes).post(protect, upsertNode)

module.exports = router
