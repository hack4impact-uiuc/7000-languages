/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { NO_COURSE_ID } from 'utils/constants'

// ------------------------------------
// Constants
// ------------------------------------

const initialState = {
  allCourses: [
    {
      _id: NO_COURSE_ID,
      name: 'No Courses',
      num_units: 'Join or start a course!',
      isContributor: false,
    },
  ],
  currentCourseId: '',
  courseDetails: {
    admin_name: '',
    admin_email: '',
    name: '',
    alternative_name: '',
    description: '',
    iso: '',
    glotto: '',
    translated_language: 'English',
    population: '',
    location: '',
    link: '',
  },
  allUnits: [],
  currentUnitId: '',
  allLessons: [],
  currentLessonId: '',
  currentVocabId: '',
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
