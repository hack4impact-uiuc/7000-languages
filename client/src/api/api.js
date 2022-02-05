import instance from './axios-config'

export const getSampleData = async () => {
  const requestString = '/home'
  const res = await instance.get(requestString)

  if (!res?.data?.success) throw new Error(res?.data?.message)

  return res.data
}

export const getData = async () => {}
