const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {
  upsertAggregate,
  getAggregates,
} = require('../controllers/aggregateController')

// router.route('/').get(protect, getAggregates).post(protect, upsertAggregate)
router.route('/').get(protect, getAggregates).post(protect, upsertAggregate)

module.exports = router
