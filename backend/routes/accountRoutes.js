const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {
  upsertAccount,
  getAccounts,
} = require('../controllers/accountController')

router.route('/').get(protect, getAccounts).post(protect, upsertAccount)

module.exports = router
