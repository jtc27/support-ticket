// Order of development 
//1. NoteSlice, NoteService (createSlice, createAsyncThunk), initialState\
//2. make functions

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import noteService from './noteService'

const initialState = {
  notes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

//GET ALL NOTES from TICKET
export const getNotes = createAsyncThunk('notes/getAll', async (ticketId, thunkAPI) => {  
  try {
    //thunkAPI can get state from auth state
    const token = thunkAPI.getState().auth.user.token

    return await noteService.getTicket(ticketId, token) //Don't need ticketData
  } catch (error) {
    //WE WANT ERROR MESSAGE FROM THE BACK END
    const message = 
    (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {

  }
})

export const {reset} = noteSlice.actions //regular reducer
export default noteSlice.reducer //bring into store.js