/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

// ------------------------------------
// Constants
// ------------------------------------

const initialState = {
  allCourses: [],
  currentCourseId: '',
}

// ------------------------------------
// Slice
// ------------------------------------

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    updateAllCourses: (state, { payload }) => {
      state.allCourses = payload.allCourses
    },
    setCurrentCourse: (state, { payload }) => {
      state.currentCourseId = payload.currentCourseId
    },
  },
})

export const { action } = languageSlice
export const { updateAllCourses, setCurrentCourse } = languageSlice.actions

export default languageSlice.reducer
