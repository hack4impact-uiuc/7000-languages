import instance from './axios-config'

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

// TODO: add create unit

export const getUnit = async (courseID, unitID) => {
  const requestString = `/course?course_id=${courseID}&unit_id=${unitID}`
  const res = await instance.get(requestString)

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

export const updateUnits = async (courseID, updates) => {
  const body = {
    course_id: courseID,
    updates,
  }
  const requestString = '/language/course'
  const res = await instance.put(requestString, body)

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

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
