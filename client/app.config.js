import 'dotenv/config'
export default ({ config }) => {
  return {
    ...config,
    extra: {
      apiURL: '', // Comment out if you want to connect to the local api
      apiDevelopmentPort: 3000,
      expoClientId:
        '1534417123-kdiotii3qddj0kumdchnrv870u9c0ihl.apps.googleusercontent.com',
    },
  }
}
