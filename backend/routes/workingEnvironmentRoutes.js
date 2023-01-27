const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {
  upsertWorkingEnvironment,
  getWorkingEnvironments,
} = require('../controllers/workingEnvironmentController')

// router.post('/', upsertWorkingEnvironment)
router
  .route('/')
  .get(protect, getWorkingEnvironments)
  .post(protect, upsertWorkingEnvironment)

module.exports = router
