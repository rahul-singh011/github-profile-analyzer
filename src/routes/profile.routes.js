
const express = require('express')
const router = express.Router()
const {analyzeProfile} = require('../controllers/profile.controller')

router.post('/:username' , analyzeProfile)

module.exports = router;