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
  checked: false,
  loggedIn: false,
  me: {},
}

// ------------------------------------
// Slice
// ------------------------------------

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    authenticate: (state, { payload }) => {
      state.loggedIn = payload.loggedIn
      state.checked = payload.checked
    },
    saveMe: (state, { payload }) => {
      state.me = payload.me
    },
  },
})

export const { action } = appSlice
export const { authenticate, saveMe } = appSlice.actions

export default appSlice.reducer
