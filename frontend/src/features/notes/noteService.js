// Order of development 
//1. NoteSlice, NoteService (createSlice, createAsyncThunk), initialState\
//2. make a function Slice
//3. make the function in Service  (axios, url endpoint)

import axios from 'axios'

const API_URL = 'api/tickets/'

//Get all ticket notes
const getNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}` //sending a token you need it in header, just like in POSTMAN
    }
  }

  const response = await axios.get(API_URL + ticketId + '/notes', config)

  return response.data
}

const noteService = {
  getNotes,
}

export default noteService