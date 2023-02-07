/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { NO_COURSE_ID } from 'utils/constants'
import i18n from 'utils/i18n'

// ------------------------------------
// Constants
// ------------------------------------

const initialState = {
  allCourses: [
    {
      _id: NO_COURSE_ID,
      name: i18n.t('dict.noCourses'),
      num_units: i18n.t('dialogue.joinOrStartCourse'),
      isContributor: true,
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
  currentLanguage: 'English',
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
    setLessonToComplete: (state) => {
      const lessonIdx = state.allLessons.findIndex(
        (element) => element._id === state.currentLessonId,
      )

      state.allLessons[lessonIdx].complete = true

      // Check if all lessons are complete - if so, mark the unit as complete
      const completeLessons = state.allLessons.filter(
        (lesson) => lesson.complete,
      ).length

      if (completeLessons === state.allLessons.length) {
        const unitIdx = state.allUnits.findIndex(
          (element) => element._id === state.currentUnitId,
        )

        state.allUnits[unitIdx].complete = true
      }
    },
    removeCourse: (state, { payload }) => {
      // Removes a course from redux
      const courseIdx = state.allCourses.findIndex(
        (element) => element._id === payload.courseId
          && element.isContributor === payload.isContributor,
      )

      state.allCourses.splice(courseIdx, 1)

      if (state.allCourses.length === 0) {
        state.allCourses = initialState.allCourses
      }

      if (state.currentCourseId === payload.courseId) {
        state.currentCourseId = initialState.currentCourseId
      }
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
    patchSelectedLesson: (state, { payload }) => {
      /* Patches the fields for a selected lesson. This is called after submitting on <UpdateLesson/>. */

      // Update the data in allLessons
      const lessonIndex = state.allLessons.findIndex(
        (element) => element._id === state.currentLessonId,
      )
      Object.keys(payload.lesson).forEach((key) => {
        if (
          key in state.allLessons[lessonIndex]
          && typeof state.allLessons[lessonIndex][key]
            === typeof payload.lesson[key]
        ) {
          state.allLessons[lessonIndex][key] = payload.lesson[key]
        }
      })
      // Update the data in lessonData
      Object.keys(payload.lesson).forEach((key) => {
        if (
          key in state.lessonData
          && typeof state.lessonData[key] === typeof payload.lesson[key]
        ) {
          state.lessonData[key] = payload.lesson[key]
        }
      })
    },

    patchSelectedCourse: (state, { payload }) => {
      /* Patches the fields for a selected course. This is called after submitting on <UpdateCourse/>. */
      const courseIndex = state.allCourses.findIndex(
        (element) => element._id === state.currentCourseId,
      )

      Object.keys(payload.course).forEach((key) => {
        if (
          key in state.allCourses[courseIndex]
          && typeof state.allCourses[courseIndex][key]
            === typeof payload.course[key]
        ) {
          state.allCourses[courseIndex][key] = payload.course[key]
        }
      })

      if (payload.course.details?.name) {
        state.allCourses[courseIndex].name = payload.course.details?.name
      }

      // Update the data in courseDetails
      Object.keys(payload.course.details).forEach((key) => {
        if (
          key in state.courseDetails
          && typeof state.courseDetails[key] === typeof payload.course.details[key]
        ) {
          state.courseDetails[key] = payload.course.details[key]
        }
      })
    },

    patchSelectedUnit: (state, { payload }) => {
      /* Patches the fields for a selected unit. This is called after submitting on <UpdateUnit/>. */

      // Update the data in allUnits
      const unitIndex = state.allUnits.findIndex(
        (element) => element._id === state.currentUnitId,
      )

      Object.keys(payload.unit).forEach((key) => {
        if (
          key in state.allUnits[unitIndex]
          && typeof state.allUnits[unitIndex][key] === typeof payload.unit[key]
        ) {
          state.allUnits[unitIndex][key] = payload.unit[key]
        }
      })
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
    setSecurityCode: (state, { payload }) => {
      state.courseDetails.code = payload.code
    },
    updateCourseVisibility: (state, { payload }) => {
      state.courseDetails.is_private = payload.is_private
    },
    updateSecurityCode: (state, { payload }) => {
      state.courseDetails.code = payload.code
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
  removeCourse,
  addUnit,
  addLesson,
  addVocab,
  updateVocab,
  patchSelectedLesson,
  patchSelectedUnit,
  patchSelectedCourse,
  clear,
  setSecurityCode,
  resetField,
  clearCourseData,
  updateCourseVisibility,
  updateSecurityCode,
  updateNumLessons,
  updateNumUnits,
  updateVocabs,
  updateNumVocab,
  pushAudioURI,
  pushImageURI,
  setLessonToComplete,
} = languageSlice.actions

export default languageSlice.reducer
