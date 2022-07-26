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

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: (state) => initialState //reset makes the state back to initialState
  },
  extraReducers: (builder) => {
    //Add our cases in extraReducers

  }
})

export const {reset} = ticketSlice.actions
export default ticketSlice.reducer
