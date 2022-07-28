import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import ticketService from './ticketService'

const initialState = {
  tickets: [], //array of tickets
  ticket: {}, //object for a single ticket
  isError: false,
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

//GET USER TICKETS
export const getTickets = createAsyncThunk('tickets/getAll', async (_, thunkAPI) => { //Don't need ticketData
  try {
    //thunkAPI can get state from auth state
    const token = thunkAPI.getState().auth.user.token

    return await ticketService.getTickets(token) //Don't need ticketData
  } catch (error) {
    //WE WANT ERROR MESSAGE FROM THE BACK END
    const message = 
    (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

//GET ONE TICKET
export const getTicket = createAsyncThunk('tickets/get', async (ticketId, thunkAPI) => {  
  try {
    //thunkAPI can get state from auth state
    const token = thunkAPI.getState().auth.user.token

    return await ticketService.getTicket(ticketId, token) //Don't need ticketData
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
    .addCase(getTickets.pending, (state) => {state.isLoading = true})
    .addCase(getTickets.fulfilled, (state, action) => {  //GETTING DATA SO WE PASS IN ACTION
      state.isLoading = false
      state.isSuccess = true
      state.tickets = action.payload
    })
    .addCase(getTickets.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
    .addCase(getTicket.pending, (state) => {state.isLoading = true})
    .addCase(getTicket.fulfilled, (state, action) => {  //GETTING DATA SO WE PASS IN ACTION
      state.isLoading = false
      state.isSuccess = true
      state.ticket = action.payload
    })
    .addCase(getTicket.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload
    })
  }
})

export const {reset} = ticketSlice.actions
export default ticketSlice.reducer
