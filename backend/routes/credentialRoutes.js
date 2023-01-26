const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {
  addCredential,
  getCredentials,
} = require('../controllers/credentialController')

router.route('/').post(protect, addCredential).get(protect, getCredentials)

module.exports = router
