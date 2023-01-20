const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const { upsertVolume, getVolumes } = require('../controllers/volumeController')

// efficient example
//router.route('/').get(protect, getPosts).post(protect, createPost)

// router.post('/', upsertVolume)
// router.get('/', getVolumes)

router.route('/').get(protect, getVolumes).post(protect, upsertVolume)

module.exports = router
