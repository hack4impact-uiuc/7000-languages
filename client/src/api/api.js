import instance from './axios-config'

export const createUser = async (userData) => {
  const requestString = '/user'
  const res = await instance.post(requestString, userData)

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

export const postApplication = async (applicationData) => {
  const requestString = '/newApplication'
  const res = await instance.post(requestString, applicationData)

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}


export const getData = async () => {}
