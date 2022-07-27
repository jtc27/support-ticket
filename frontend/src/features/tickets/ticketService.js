//Make our request

import axios from 'axios'

const API_URL = '/api/tickets/'

//create a new ticket
const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}` //sending a token you need it in header, just like in POSTMAN
    }
  }

  const response = await axios.post(API_URL, ticketData, config)

  return response.data
}

//Get all user tickets
const getTickets = async ( token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}` //sending a token you need it in header, just like in POSTMAN
    }
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

const ticketService = {
  createTicket,
  getTickets,
}

export default ticketService