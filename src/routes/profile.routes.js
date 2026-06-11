
const express = require('express')
const router = express.Router()
const {analyzeProfile, getAllProfiles , getProfileByUsername } = require('../controllers/profile.controller')

router.post('/:username' , analyzeProfile)
router.get('/', getAllProfiles)
router.get('/:username', getProfileByUsername)

module.exports = router;