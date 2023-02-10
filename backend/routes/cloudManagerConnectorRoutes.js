const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {
  upsertCloudManagerConnector,
  getCloudManagerConnectors,
} = require('../controllers/cloudManagerConnectorController')

//router.post('/', upsertCloudManagerConnector)

router
  .route('/')
  .get(protect, getCloudManagerConnectors)
  .post(upsertCloudManagerConnector)

module.exports = router
