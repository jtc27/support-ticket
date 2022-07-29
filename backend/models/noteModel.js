//SCHEMA FOR NOTES

// Order of development 
//1. Note Model
//2. Note Routes (bring in express)
//3. Note Controller

const mongoose = require('mongoose')


const noteSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' //Need to know which user's ticket is being viewed
  },
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Ticket' //Need to know the specific ticket.  Both User and Ticket are the ObjectId, with 2 different references
  },
  text: {
    type: String,
    required: [true, 'Please add some text']
  },
  isStaff: {
    type: Boolean,
    default: false, //Note sent from a customer or staff
  },
  staffId: {
    type: String,
  },
},
{
  timestamps: true
}
)

module.exports = mongoose.model('Note', noteSchema)