const express = require('express')
const router = express.Router()

//routes list
router.get('/login', (req, res) => {
  res.send('login page')
})

module.exports = router
