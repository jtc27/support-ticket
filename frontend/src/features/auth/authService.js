import axios from 'axios' //or can use fetchAPI, but axios has additional tools

const API_URL = '/api/users'
// Frontend package.json has "proxy": "http://localhost:5000" (The backend server)
// Otherwise it will go to "http://localhost:3000/api/users" (front end server) and we don't want that

// Register user function, same thing we did in Postman with the post request to http://localhost:5000/api/users/login
const register = async(userData) => {
  const response = await axios.post(API_URL, userData) //post request

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
    //setItem: saves the data we get back, including web token
    //stringify: local storage can only hold strings, not JSON
  }

  return response.data
}

const authService = {
  register // Register user function
}

export default authService