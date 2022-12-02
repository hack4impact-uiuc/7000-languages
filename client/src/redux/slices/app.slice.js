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
  language: ''
}

// ------------------------------------
// Slice
// ------------------------------------

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.isLoading = payload.isLoading
    },
    updateLanguage: (state, { payload }) => {
      state.language = payload.language
    },
  },
})

export const { action } = appSlice
export const { setLoading, updateLanguage } = appSlice.actions

export default appSlice.reducer
