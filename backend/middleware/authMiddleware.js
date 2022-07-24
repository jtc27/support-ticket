const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

//function that protects certain routes
const protect = asyncHandler(async (req, res, next) => {
  let token

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      //Get token from the header
      token = req.headers.authorization.split(' ')[1] //splits it into [Bearer] [token], retrieve the [token]

      //verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      //token is now decoded with the user id inside in decoded.id

      //get user from the token
      req.user = await User.findById(decoded.id).select('-password')  //-password excludes the password
      // req.user is now set to the ID of the user, found by the token

      next() //calls next piece of middleware

    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized')
  }
})

module.exports = {protect}