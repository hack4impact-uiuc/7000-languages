import instance from './axios-config'

export const createUser = async (userData) => {
  const requestString = '/user'
  const res = await instance.post(requestString, userData)

  console.log('got data')
  console.log(res);

  if (!res?.data?.success) throw new Error(res?.data?.message)
  return res.data
}

export const getData = async () => {}
