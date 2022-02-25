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
  idToken: "",
}

// ------------------------------------
// Slice
// ------------------------------------

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: (state, action) => {
      state.loggedIn = action.payload;
    },
    saveToken: (state, { payload }) => {
      state.idToken = payload.idToken;
    },
    removeToken: (state) => {
      state.idToken = initialState.idToken;
    },
  },
})

export const { action } = authSlice
export const { authenticate, saveToken, removeToken } = authSlice.actions

export default authSlice.reducer
