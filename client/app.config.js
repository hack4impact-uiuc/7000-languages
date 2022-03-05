import { API_PORT, IOS_CLIENT_ID, ANDROID_CLIENT_ID } from '@env'

export default ({ config }) => {
  return {
    ...config,
    extra: {
      developmentApiPort: API_PORT,
      iosClientId: IOS_CLIENT_ID,
      androidClientId: ANDROID_CLIENT_ID,
    },
  }
}
