const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// GET USER TICKETS
// route: GET /api/tickets
// access is private
const getTickets = asyncHandler (async(req, res) => {

  res.status(200).json({message: 'getTickets'})
})

// CREATE A NEW TICKET
// route: POST /api/tickets
// access is private
const createTicket = asyncHandler (async(req, res) => {

  res.status(200).json({message: 'create a Ticket'})
})

module.exports = {
  getTickets,
  createTicket,
}