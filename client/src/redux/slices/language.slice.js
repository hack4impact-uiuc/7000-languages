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
  lessonData: {},
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
    setCurrentVocabId: (state, { payload }) => {
      state.currentVocabId = payload.currentVocabId
    },
    setAllUnits: (state, { payload }) => {
      state.allUnits = payload.allUnits
    },
    addUnit: (state, { payload }) => {
      state.allUnits.push(payload.unit)
    },
    setCurrentLessonId: (state, { payload }) => {
      state.currentLessonId = payload.currentLessonId
    },
    setAllLessons: (state, { payload }) => {
      state.allLessons = payload.allLessons
    },
    addLesson: (state, { payload }) => {
      state.allLessons.push(payload.lesson)
    },
    setLessonData: (state, { payload }) => {
      state.lessonData = payload.lessonData
    },
    addVocab: (state, { payload }) => {
      state.lessonData.vocab.push(payload.vocab)
    },
    updateVocab: (state, { payload }) => {
      const vocabIndex = state.lessonData.vocab.findIndex(
        (element) => element._id === state.currentVocabId,
      )
      state.lessonData.vocab[vocabIndex] = payload.vocab
    },
  },
})

export const { action } = languageSlice
export const {
  updateAllCourses,
  setCurrentCourse,
  addVocab,
  updateVocab,
  setCurrentVocabId,
  setCurrentLessonId,
  setLessonData,
  setAllLessons,
  addLesson,
  addUnit,
  setAllUnits,
} = languageSlice.actions

export default languageSlice.reducer
