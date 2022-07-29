// Order of development 
//1. Note Model
//2. Note Routes (bring in express)
//3. Note Controller


const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')  
const Note = require('../models/noteModel') //I need the user, ticket and note


// GET NOTES FOR A TICKET
// route: GET /api/tickets/:ticketId/notes
// access is private
const getNotes = asyncHandler (async(req, res) => {

  //get user using the id from JWT
  const user = await User.findById(req.user.id)

  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.ticketId) //get ticketId from url

  //make sure it's the user's ticket
  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const notes = await Note.find({ticket: req.params.ticketId})
  //Awaits Note Model

  res.status(200).json(notes)
})

module.exports = {
  getNotes,
}