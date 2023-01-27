const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {
  upsertInstance,
  getInstances,
} = require('../controllers/instanceController')

router.route('/').get(protect, getInstances).post(protect, upsertInstance)

module.exports = router
