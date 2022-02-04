import instance from './axios-config'

export const getSampleData = async () => {
  const requestString = '/profile/leaderboard/?limit=15'
  const res = await instance.get(requestString)
  if (!res?.data?.success) throw new Error(res?.data?.message)

  return res.data
}
