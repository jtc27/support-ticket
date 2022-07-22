const asyncHandler = require('express-async-handler')
//we are using async await, so we don't want to use try catch block
//instead we handle errors in async express routes and pass them to the errorhandlers

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

  res.send('Register Route')
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