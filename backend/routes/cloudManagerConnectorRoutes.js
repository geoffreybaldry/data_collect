const express = require('express')
const router = express.Router()
const {
  upsertCloudManagerConnector,
} = require('../controllers/cloudManagerConnectorController')

router.post('/', upsertCloudManagerConnector)

module.exports = router
