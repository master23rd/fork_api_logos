const express = require('express')
const { authUser, register } = require('../../controllers/authController')
const router = express.Router()

//routes list
router.get('/login', authUser)
router.post('/register', register)

module.exports = router
