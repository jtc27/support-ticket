
// Registers a new user
// route: /api/users
// access is public
const registerUser = (req, res) => {
  const {name, email, password} = req.body

  //validation
  if(!name || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  res.send('Register Route')
}

// Logs in user
// route: /api/users/login
// access is public
const loginUser = (req, res) => {
  res.send('Login Route')
}

module.exports = {
  registerUser,
  loginUser
}