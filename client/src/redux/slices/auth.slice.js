/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

/*
  Here is an example slice. A "slice" is a collection of Redux reducer logic and
  actions for a single feature in your app, typically defined together in a single file.
*/

// ------------------------------------
// Constants
// ------------------------------------

const initialState = {
  loggedIn: false,
  userEmail: '',
  userName: '',
  profileUrl: '',
}

// ------------------------------------
// Slice
// ------------------------------------

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: (state, { payload }) => {
      state.loggedIn = payload.loggedIn
    },
    setPersonalInfo: (state, { payload }) => {
      state.userEmail = payload.userEmail
      state.userName = payload.userName
      state.profileUrl = payload.profileUrl
    },
    logout: (state) => {
      state.loggedIn = initialState.loggedIn
      state.userEmail = initialState.userEmail
      state.userName = initialState.userName
      state.profileUrl = initialState.profileUrl
    },
  },
})

export const { action } = authSlice
export const { authenticate, logout, setPersonalInfo } = authSlice.actions

export default authSlice.reducer
