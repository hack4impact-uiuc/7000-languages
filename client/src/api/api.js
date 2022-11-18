import * as FileSystem from 'expo-file-system'
import { loadUserIDToken } from 'utils/auth'
import instance, { BASE_URL } from './axios-config'

/* User Endpoints */

export const createUser = async (userData) => {
  const requestString = '/user'
  const res = await instance.post(requestString, userData)

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

export const getUser = async () => {
  const requestString = '/user'
  const res = await instance.get(requestString)

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

/* Course Endpoints */

export const createCourse = async (applicationData) => {
  const requestString = '/language/course'
  const res = await instance.post(requestString, applicationData)

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

export const updateCourse = async (courseID, updates) => {
  const body = { details: updates }
  const requestString = `/language/course/${courseID}`
  const res = await instance.patch(requestString, body)

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

export const getCourse = async (courseID) => {
  const requestString = `/language/course/${courseID}`
  const res = await instance.get(requestString)

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

/* Unit Endpoints */

export const getUnit = async (courseID, unitID) => {
  const requestString = `/language/unit?course_id=${courseID}&unit_id=${unitID}`
  const res = await instance.get(requestString)

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

export const createUnit = async (unit) => {
  const requestString = '/language/unit'
  const res = await instance.post(requestString, unit)

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

export const updateUnit = async (unitId, updates) => {
  const body = updates

  const requestString = `/language/unit/${unitId}`
  const res = await instance.patch(requestString, body)

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

export const updateUnits = async (courseID, updates) => {
  const body = {
    course_id: courseID,
    updates,
  }
  const requestString = '/language/unit'
  const res = await instance.put(requestString, body)

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

/* Lesson Endpoints */

export const getLesson = async (courseID, lessonID) => {
  const requestString = `/language/lesson?course_id=${courseID}&lesson_id=${lessonID}`
  const res = await instance.get(requestString)

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

export const updateSingleLesson = async (lessonID, courseID, updates) => {
  const body = {
    course_id: courseID,
    lesson_id: lessonID,
    updates,
  }
  const requestString = '/language/lesson'
  const res = await instance.patch(requestString, body)

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

export const updateLessons = async (courseID, updates) => {
  const body = {
    course_id: courseID,
    updates,
  }
  const requestString = '/language/lesson'
  const res = await instance.put(requestString, body)

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

export const createLesson = async (courseID, unitID, lesson) => {
  const body = {
    course_id: courseID,
    unit_id: unitID,
    lesson,
  }
  const requestString = '/language/lesson'
  const res = await instance.post(requestString, body)

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

/* Vocab Item Endpoints */

export const createVocabItem = async (courseID, lessonID, vocab) => {
  const body = {
    course_id: courseID,
    lesson_id: lessonID,
    vocab,
  }
  const requestString = '/language/vocab'
  const res = await instance.post(requestString, body)

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

export const updateVocabItems = async (courseID, lessonID, updates) => {
  const body = {
    course_id: courseID,
    lesson_id: lessonID,
    vocab_updates: updates,
  }
  const requestString = '/language/vocab'
  const res = await instance.put(requestString, body)

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

export const updateVocabItem = async (
  courseID,
  lessonID,
  vocabID,
  vocabUpdate,
) => {
  const body = {
    course_id: courseID,
    lesson_id: lessonID,
    vocab_id: vocabID,
    vocab_update: vocabUpdate,
  }
  const requestString = '/language/vocab'
  const res = await instance.patch(requestString, body)

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

/* Audio Endpoints */
export const uploadAudioFile = async (
  courseId,
  unitId,
  lessonId,
  vocabId,
  uri,
) => {
  const idToken = await loadUserIDToken()
  const res = await FileSystem.uploadAsync(
    `${BASE_URL}/language/audio/${courseId}/${unitId}/${lessonId}/${vocabId}`,
    uri,
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      httpMethod: 'POST',
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: 'file',
    },
  )

  const body = JSON.parse(res.body)

  if (!body.success || body.success === 'false') {
    throw new Error(body.message)
  }
  return body
}

/* Audio Endpoints */
export const downloadAudioFile = async (
  courseId,
  unitId,
  lessonId,
  vocabId,
  fileType,
) => {
  const idToken = await loadUserIDToken()
  const downloadResumable = FileSystem.createDownloadResumable(
    `${BASE_URL}/language/audio/${courseId}/${unitId}/${lessonId}/${vocabId}`,
    `${FileSystem.documentDirectory}${vocabId}-audio.${fileType}`,
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      httpMethod: 'GET',
      downloadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
    },
  )
  try {
    const { uri } = await downloadResumable.downloadAsync()
    return uri
  } catch (e) {
    throw new Error(e.message)
  }
}

/* Audio Endpoints */
export const deleteAudioFile = async (courseId, unitId, lessonId, vocabId) => {
  const requestString = `/language/audio/${courseId}/${unitId}/${lessonId}/${vocabId}`
  const res = await instance.delete(requestString)

  const body = res.data
  if (!body.success || body.success === 'false') {
    throw new Error(body.message)
  }
  return body
}

/* Image Endpoints */
export const uploadImageFile = async (
  courseId,
  unitId,
  lessonId,
  vocabId,
  uri,
) => {
  const idToken = await loadUserIDToken()
  const res = await FileSystem.uploadAsync(
    `${BASE_URL}/language/image/${courseId}/${unitId}/${lessonId}/${vocabId}`,
    uri,
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      httpMethod: 'POST',
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: 'file',
    },
  )

  const body = JSON.parse(res.body)

  if (!body.success || body.success === 'false') {
    throw new Error(body.message)
  }
  return body
}

export const downloadImageFile = async (
  courseId,
  unitId,
  lessonId,
  vocabId,
  fileType,
) => {
  const idToken = await loadUserIDToken()
  const downloadResumable = FileSystem.createDownloadResumable(
    `${BASE_URL}/language/image/${courseId}/${unitId}/${lessonId}/${vocabId}`,
    `${FileSystem.documentDirectory}${vocabId}-image.${fileType}`,
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      httpMethod: 'GET',
      downloadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
    },
  )
  try {
    const { uri } = await downloadResumable.downloadAsync()
    return uri
  } catch (e) {
    throw new Error(e.message)
  }
}

/* Image Endpoints */
export const deleteImageFile = async (courseId, unitId, lessonId, vocabId) => {
  const requestString = `/language/image/${courseId}/${unitId}/${lessonId}/${vocabId}`
  const res = await instance.delete(requestString)

  const body = res.data
  if (!body.success || body.success === 'false') {
    throw new Error(body.message)
  }
  return body
}
