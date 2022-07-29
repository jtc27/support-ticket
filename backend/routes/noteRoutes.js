// Order of development 
//1. Note Model
//2. Note Routes (bring in express)
//3. Note Controller

const express = require('express')
const router = express.Router({mergeParams: true})  //mergeParams object passed in, allows ticketRoutes

//Middleware
const {protect} = require('../middleware/authMiddleware')

const {getNotes, addNote } = require('../controllers/noteController')
 

router.route('/').get(protect, getNotes).post(protect, addNote)

module.exports = router

// I want the route to be
// /api/tickets/:ticketId/notes
// So I have to open up ticketRoutes