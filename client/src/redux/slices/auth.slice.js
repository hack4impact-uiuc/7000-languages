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
  userFullName: '',
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
    logout: (state) => {
      state.loggedIn = initialState.loggedIn
    },
    setUserFullName: (state, { payload }) => {
      state.userFullName = payload.userFullName
    },
    setUserGivenName: (state, { payload }) => {
      state.userGivenName = payload.userGivenName
    },
  },
})

export const { action } = authSlice
export const {
  authenticate, logout, setUserFullName, setUserGivenName,
} = authSlice.actions

export default authSlice.reducer
