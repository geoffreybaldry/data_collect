const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { upsertAggregate } = require('../controllers/aggregateController')

// router.route('/').get(protect, getAggregates).post(protect, upsertAggregate)
router.route('/').post(protect, upsertAggregate)

module.exports = router
