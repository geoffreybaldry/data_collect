const express = require('express')
const router = express.Router()
const {
  upsertWorkingEnvironment,
} = require('../controllers/workingEnvironmentController')

router.post('/', upsertWorkingEnvironment)

module.exports = router
