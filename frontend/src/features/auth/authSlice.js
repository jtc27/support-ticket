import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authService from "./authService";

//Get user from local storage.  A browser refresh will set the state to default
//If a user is logged in, their data is saved to local storage so they can continue browsing with their account.  
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user? user : null,  //This brings up the local storage user data if it exists
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//REGISTER NEW USER
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user)
  } catch (error) {
    //WE WANT ERROR MESSAGE FROM THE BACK END
    const message = 
    (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

//LOGIN USER
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    //WE WANT ERROR MESSAGE FROM THE BACK END
    const message = 
    (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    return thunkAPI.rejectWithValue(message)
  }
})

//LOGOUT USER
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //SETS STATE BACK TO DEFAULT
    reset: (state) => {
      state.isLoading = false
      state.isError= false
      state.isSuccess = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(register.pending, (state) => {
      state.isLoading = true
    })
    .addCase(register.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.user = action.payload
    })
    .addCase(register.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload //above in function register we have: return thunkAPI.rejectWithValue(message)... this is the PAYLOAD
      state.user = null
    })
    .addCase(logout.fulfilled, (state) => {
      state.user = null
    })
    .addCase(login.pending, (state) => {
      state.isLoading = true
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.user = action.payload
    })
    .addCase(login.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.message = action.payload // thunkAPI.rejectWithValue(message)... this is the PAYLOAD
      state.user = null
    })
  }

  //SINCE we are using createAsyncThunk, that stuff goes in the extraReducers
})

export const {reset} = authSlice.actions //exports reset which is found in the reducers
export default authSlice.reducer

