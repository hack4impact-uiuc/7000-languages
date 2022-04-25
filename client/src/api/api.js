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

export const updateUnits = async (course_id, updates) => {
  const body = {
    course_id,
    updates
  }
  const requestString = `/language/course`
  const res = await instance.put(requestString, body);

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

export const getLesson = async (course_id, lesson_id) => {
  const requestString = `/language/lesson?course_id=${course_id}&lesson_id=${lesson_id}`
  const res = await instance.get(requestString);

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

export const updateLessons = async (course_id, updates) => {
  const body = {
    course_id,
    updates
  }
  const requestString = `/language/lesson`
  const res = await instance.put(requestString, body);

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

export const createLesson = async (course_id, unit_id, lesson) => {
  const body = {
    course_id,
    unit_id,
    lesson
  }
  const requestString = `/language/lesson`
  const res = await instance.post(requestString, body);

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

export const createVocabItem = async (course_id, lesson_id, vocab) => {
  const body = {
    course_id,
    lesson_id,
    vocab
  }
  const requestString = `/language/vocab`
  const res = await instance.post(requestString, body);

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

export const updateVocabItem = async (course_id, lesson_id, vocab_id, vocab_update) => {
  const body = {
    course_id,
    lesson_id,
    vocab_id,
    vocab_update
  }
  const requestString = `/language/vocab`
  const res = await instance.patch(requestString, body);

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}





