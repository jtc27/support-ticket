import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import ticketService from './ticketService'

const initialState = {
  tickets: [], //array of tickets
  ticket: {}, //object for a single ticket
  isErrot: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//CREATE A NEW TICKET
export const createTicket = createAsyncThunk('tickets/create', async (ticketData, thunkAPI) => {
  try {
    //thunkAPI can get state from auth state
    const token = thunkAPI.getState().auth.user.token
    //^ a feature of redux toolkit vs regular redux

    return await ticketService.createTicket(ticketData, token)
  
  } catch (error) {
    //WE WANT ERROR MESSAGE FROM THE BACK END
    const message = 
    (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: (state) => initialState //reset makes the state back to initialState
  },
  extraReducers: (builder) => {
    //Add our cases in extraReducers
    builder
    .addCase(createTicket.pending, (state) => {state.isLoading = true})
    .addCase(createTicket.fulfilled, (state) => {
      state.isLoading = false
      state.isSuccess = true
    })
    .addCase(createTicket.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
  }
})

export const {reset} = ticketSlice.actions
export default ticketSlice.reducer
