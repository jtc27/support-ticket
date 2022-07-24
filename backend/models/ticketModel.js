//SCHEMA FOR TICKETS

const mongoose = require('mongoose')


//Each ticket must be tied to a user
const ticketSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' //ref is needed so it will look in the "User" collection for an ObjectId
  },
  product: {
    type: String,
    required: [true, 'Please select a product'],
    enum: ['iPhone', 'Macbook Pro',  'iMac', 'iPad'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description of the issue']
  },
  status: {
    type: String,
    required: true,
    enum: ['new', 'open', 'closed'],
    default: 'new'
  },
},
{
  timestamps: true
}
)

module.exports = mongoose.model('Ticket', ticketSchema)