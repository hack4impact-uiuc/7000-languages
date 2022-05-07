import 'dotenv/config'

export default ({ config }) => {
  return {
    ...config,
    extra: {
      apiURL: 'http://7000-languages-api-env.us-east-1.elasticbeanstalk.com',
      apiDevelopmentPort: 3000,
      iosClientId: '558041423211-6pi044evlevj0elng4cr9knggsvl6t4c.apps.googleusercontent.com',
      androidClientId: '558041423211-rm0a53ibbaga8e7d7aj4rgknt6qflk6v.apps.googleusercontent.com',
    },
  }
}
