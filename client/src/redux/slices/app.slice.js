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
  isLoading: false,
  userName: '',
}

// ------------------------------------
// Slice
// ------------------------------------

const appSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload.isLoading
    },
    setUserName: (state, { payload }) => {
      state.userName = payload.userName
    },
  },
})

export const { action } = appSlice
export const { setLoading, setUserName } = appSlice.actions

export default appSlice.reducer
