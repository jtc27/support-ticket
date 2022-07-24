const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// GET USER TICKETS
// route: GET /api/tickets
// access is private
const getTickets = asyncHandler (async(req, res) => {

  //get user using the id from JWT
  const user = await User.findById(req.user.id)

  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const tickets = await Ticket.find({user: req.user.id})
  res.status(200).json(tickets)
})

// GET ONE USER TICKET
// route: GET /api/tickets/:id
// access is private
const getTicket = asyncHandler (async(req, res) => {

  //get user using the id from JWT
  const user = await User.findById(req.user.id)

  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }

  //get the ticket ID from the URL
  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if(ticket.user.toString() !== req.user.id) {
    res.status(404)
    throw new Error('Not authorized') // Only the user can see their own tickets
  }

  res.status(200).json(ticket)
})
// ^ FOR THE TICKETS TO BE ACCESSED WE NEED A BEARER TOKEN and TICKET ID.  IF EITHER IS MISSING THERE WILL BE AN ERROR THROWN

// CREATE A NEW TICKET
// route: POST /api/tickets
// access is private
const createTicket = asyncHandler (async(req, res) => {

  const {product, description} = req.body

  if(!product || !description) {
    res.status(400)
    throw new Error('Please add a product and description')
  }

  //get user using the id from JWT
  const user = await User.findById(req.user.id)

  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }

  //Create ticket
  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new',
  })


  res.status(201).json(ticket)
})

module.exports = {
  getTickets,
  getTicket,
  createTicket,
}