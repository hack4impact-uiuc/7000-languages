import 'dotenv/config'
export default ({ config }) => {
  return {
    ...config,
    extra: {
      apiURL: '', // Comment out if you want to connect to the local api
      apiDevelopmentPort: 3000,
      expoClientId:
        '1534417123-rirmc8ql9i0jqrqchojsl2plf5c102j6.apps.googleusercontent.com',
      clientSecret: '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',
    },
  }
}