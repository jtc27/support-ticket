const asyncHandler = require('express-async-handler')
//we are using async await, so we don't want to use try catch block
//instead we handle errors in async express routes and pass them to the errorhandlers

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

// REGISTER A NEW USER
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

  //if user has been created... the data will be sent back
  if(user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data');
  }
})

// USER LOGIN
// route: /api/users/login
// access is public
const loginUser = asyncHandler (async(req, res) => {
  const {email, password} = req.body

  const user = await User.findOne({email})

  //check if user exists
  //check if passwords match
  // send data back
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
       _id: user._id,
       name: user.name,
       email: user.email,
       token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid credentials')
  }
})

// GET CURRENT USER
// route: /api/users/me
// access is private
const getMe = asyncHandler (async(req, res) => {
  
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name
  }
  //structured to only include id, email and name without timestamps, admin status

  res.status(200).json(user)
})

//Generate Token function
const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}