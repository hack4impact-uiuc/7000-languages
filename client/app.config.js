import 'dotenv/config'
export default ({ config }) => {
  return {
    ...config,
    extra: {
      // apiURL: '', // Comment out if you want to connect to the local api
      apiDevelopmentPort: 3000,
      iosClientId:
        '1534417123-ghavvlkgsmuc7nmu8o9d28se4e9s9cd1.apps.googleusercontent.com',
      androidClientId:
        '1534417123-gmng6jq2mvii7oa2gibcovt0cqpqk6fn.apps.googleusercontent.com',
    },
  }
}
