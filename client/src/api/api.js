import * as FileSystem from 'expo-file-system'
import instance, { BASE_URL } from './axios-config'

let cachedJWTToken = null

export const setAuthToken = (token) => {
  cachedJWTToken = token
}

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
  const res = await FileSystem.uploadAsync(
    `${BASE_URL}/language/audio/${courseId}/${unitId}/${lessonId}/${vocabId}`,
    uri,
    {
      headers: {
        Authorization: `Bearer ${cachedJWTToken}`,
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
) => {
  await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + `${courseId}/${unitId}/${lessonId}/${vocabId}`)
  const downloadResumable = FileSystem.createDownloadResumable(
    `${BASE_URL}/language/audio/${courseId}/${unitId}/${lessonId}/${vocabId}`,
    FileSystem.documentDirectory + `${courseId}/${unitId}/${lessonId}/${vocabId}/audio.mp3`,
    {
      headers: {
        Authorization: `Bearer ${cachedJWTToken}`,
      },
      httpMethod: 'GET',
      downloadType: FileSystem.FileSystemUploadType.MULTIPART,
    },
  );
  try {
    const { uri } = await downloadResumable.downloadAsync();
    console.log('Finished downloading to ', uri);
    return uri;
  } catch (e) {
    console.error(e);
  }
  return null;
}

