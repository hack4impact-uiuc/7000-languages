import instance from './axios-config'

export const createUser = async (userData) => {
  const requestString = '/user'
  const res = await instance.post(requestString, userData)

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

export const createCourse = async (applicationData) => {
  const requestString = '/language/course'
  const res = await instance.post(requestString, applicationData)

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

export const getUser = async () => {
  const requestString = '/user'
  const res = await instance.get(requestString)

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

export const getCourse = async (course_id) => {
  const requestString = `/language/course/${course_id}`
  const res = await instance.get(requestString)

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

export const getCourse = async (courseID) => {
  const requestString = `/course/${courseID}`
  const res = await instance.get(requestString)

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

// TODO: add create unit

// export const getUnit = async (courseID) => {
//   const requestString = `/course/${courseID}`
//   const res = await instance.get(requestString)

//   if (!res?.data?.success) throw new Error(res?.data?.message)
//   return res.data
// }

// getUnit
// updateUnits

// getLesson
// updateLessons
// createLesson

// createVocabItem
// updateVocabItem




