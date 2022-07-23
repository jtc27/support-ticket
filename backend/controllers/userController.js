const asyncHandler = require('express-async-handler')
//we are using async await, so we don't want to use try catch block
//instead we handle errors in async express routes and pass them to the errorhandlers

const bcrypt = require('bcryptjs')

const User = require('../models/userModel')

// Registers a new user
// route: /api/users
// access is public
const registerUser = asyncHandler (async(req, res) => {
  const {name, email, password} = req.body

  //validation
  if(!name || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // After validation
  // Find is user already exists
  const userExists = await User.findOne({email})

  if(userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  //Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  //if user has been created...
  if(user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email
    })
  } else {
    res.status(400)
    throw new error('Invalid user data');
  }
})

// Logs in user
// route: /api/users/login
// access is public
const loginUser = asyncHandler (async(req, res) => {
  res.send('Login Route')
})

module.exports = {
  registerUser,
  loginUser
}