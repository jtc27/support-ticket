const express = require('express')
const router = express.Router()
const { registerUser, loginUser } = require('../controllers/userController')
// controllers have been made which point to the routes

router.post('/', registerUser)

router.post('/login', loginUser)

module.exports = router
//module.exports is common js syntax