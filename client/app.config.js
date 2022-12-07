import 'dotenv/config'
export default ({ config }) => {
  return {
    ...config,
    extra: {
      apiURL: 'http://7000-languages-api-prod-env.eba-9hbad6za.us-east-1.elasticbeanstalk.com', // Comment out if you want to connect to the local api
      apiDevelopmentPort: 3000,
      expoClientId:
        '1534417123-kdiotii3qddj0kumdchnrv870u9c0ihl.apps.googleusercontent.com',
      clientSecret: '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',
    },
  }
}
