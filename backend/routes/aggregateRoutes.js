const express = require('express')
const router = express.Router()
const { upsertAggregate } = require('../controllers/aggregateController')

router.post('/', upsertAggregate)

module.exports = router
