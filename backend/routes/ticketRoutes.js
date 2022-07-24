const express = require('express')
const router = express.Router()

const {getTickets, getTicket, createTicket, deleteTicket, updateTicket} = require('../controllers/ticketController')

const {protect} = require('../middleware/authMiddleware')

// in server.js WE HAVE: app.use('/api/tickets', require('./routes/ticketRoutes'))
router.route('/').get(protect, getTickets).post(protect, createTicket)
router.route('/:id').get(protect, getTicket).delete(protect, deleteTicket).put(protect, updateTicket)

module.exports = router