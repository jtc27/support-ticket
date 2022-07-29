// Order of development 
//1. NoteSlice, NoteService (createSlice, createAsyncThunk), initialState\
//2. make a function Slice
//3. make the function in Service  (axios, url endpoint)

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

    return await noteService.getNotes(ticketId, token)  
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
    builder
    .addCase(getNotes.pending, (state) => {state.isLoading = true})
    .addCase(getNotes.fulfilled, (state, action) => {  //GETTING DATA SO WE PASS IN ACTION
      state.isLoading = false
      state.isSuccess = true
      state.notes = action.payload //payload is the array of notes from the server
    })
    .addCase(getNotes.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload //payload is message
    })
  }
})

export const {reset} = noteSlice.actions //regular reducer
export default noteSlice.reducer //bring into store.js