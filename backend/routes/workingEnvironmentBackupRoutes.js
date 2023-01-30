const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {
  upsertWorkingEnvironmentBackup,
  getWorkingEnvironmentsBackup,
} = require('../controllers/workingEnvironmentBackupController')

router
  .route('/')
  .get(protect, getWorkingEnvironmentsBackup)
  .post(protect, upsertWorkingEnvironmentBackup)

module.exports = router
