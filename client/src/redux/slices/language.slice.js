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
    is_private: true,
    code: '',
  },
  allUnits: [],
  currentUnitId: '',
  allLessons: [],
  currentLessonId: '',
  lessonData: { vocab: [] },
  currentVocabId: '',
}

// ------------------------------------
// Slice
// ------------------------------------

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setField: (state, { payload }) => {
      state[payload.key] = payload.value
    },
    addUnit: (state, { payload }) => {
      // Pushes new unit to the list containing all units
      state.allUnits.push(payload.unit)

      // The num_units field stores the total number of selected units,
      // and since we increased this number by 1, we need to update num_units
      const courseIdx = state.allCourses.findIndex(
        (element) => element._id === state.currentCourseId,
      )
      state.allCourses[courseIdx].num_units += 1
    },
    addLesson: (state, { payload }) => {
      state.allLessons.push(payload.lesson)
      const unitIdx = state.allUnits.findIndex(
        (element) => element._id === state.currentUnitId,
      )
      // The num_lessons field stores the total number of selected lessons,
      // and since we increased this number by 1, we need to update num_lessons
      state.allUnits[unitIdx].num_lessons += 1
    },
    addVocab: (state, { payload }) => {
      state.lessonData.vocab.push(payload.vocab)
      const lessonIdx = state.allLessons.findIndex(
        (element) => element._id === state.currentLessonId,
      )
      // The num_vocab field stores the total number of selected vocab items,
      // and since we increased this number by 1, we need to update num_vocab
      state.allLessons[lessonIdx].num_vocab += 1
    },
    updateVocab: (state, { payload }) => {
      const vocabIndex = state.lessonData.vocab.findIndex(
        (element) => element._id === state.currentVocabId,
      )
      state.lessonData.vocab[vocabIndex] = payload.vocab
    },
    clear: () => initialState,
    resetField: (state, { payload }) => {
      state[payload.key] = initialState[payload.key]
    },
    clearCourseData: (state) => {
      state.currentCourseId = initialState.currentCourseId
      state.courseDetails = initialState.courseDetails
      state.allUnits = initialState.allUnits
      state.currentUnitId = initialState.currentUnitId
      state.allLessons = initialState.allLessons
      state.currentLessonId = initialState.currentLessonId
      state.lessonData = initialState.lessonData
      state.currentVocabId = initialState.currentVocabId
    },
    updateCourseVisibilty: (state, { payload }) => {
      state.courseDetails.is_private = payload.is_private
    },
    updateNumLessons: (state, { payload }) => {
      const unitIdx = state.allUnits.findIndex(
        (element) => element._id === state.currentUnitId,
      )
      state.allUnits[unitIdx].num_lessons = payload.numSelected
    },
    updateNumUnits: (state, { payload }) => {
      const courseIdx = state.allCourses.findIndex(
        (element) => element._id === state.currentCourseId,
      )
      state.allCourses[courseIdx].num_units = payload.numSelected
    },
    updateNumVocab: (state, { payload }) => {
      const lessonIdx = state.allLessons.findIndex(
        (element) => element._id === state.currentLessonId,
      )
      state.allLessons[lessonIdx].num_vocab = payload.numSelected
    },
    updateVocabs: (state, { payload }) => {
      state.lessonData.vocab = payload.vocabItems
    },
    pushAudioURI: (state, { payload }) => {
      const { vocabId, uri } = payload
      const vocabIndex = state.lessonData.vocab.findIndex(
        (element) => element._id === vocabId,
      )
      state.lessonData.vocab[vocabIndex].audioURI = uri
    },
    pushImageURI: (state, { payload }) => {
      const { vocabId, uri } = payload
      const vocabIndex = state.lessonData.vocab.findIndex(
        (element) => element._id === vocabId,
      )
      state.lessonData.vocab[vocabIndex].imageURI = uri
    },
  },
})

export const { action } = languageSlice
export const {
  setField,
  addUnit,
  addLesson,
  addVocab,
  updateVocab,
  clear,
  resetField,
  clearCourseData,
  updateNumLessons,
  updateNumUnits,
  updateVocabs,
  updateNumVocab,
  pushAudioURI,
  pushImageURI,
} = languageSlice.actions

export default languageSlice.reducer
