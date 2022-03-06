import 'dotenv/config'

export default ({ config }) => {
  return {
    ...config,
    extra: {
      apiDevelopmentPort: process.env.API_PORT,
      iosClientId: process.env.IOS_CLIENT_ID,
      androidClientId: process.env.ANDROID_CLIENT_ID,
    },
  }
}
