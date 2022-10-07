import 'dotenv/config'
export default ({ config }) => {
  return {
    ...config,
    extra: {
      // apiURL: 'http://7000-languages-api-env.us-east-1.elasticbeanstalk.com', // Comment out if you want to connect to the local api
      apiDevelopmentPort: 3000,
      iosClientId:
        '558041423211-ch1sug9t75hsu99suqf7h4tce4k49r6a.apps.googleusercontent.com',
      androidClientId:
        '558041423211-4aiqgrad83mti5jndej3cpt20rqlqrip.apps.googleusercontent.com',
    },
  }
}
