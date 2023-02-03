let extraConfig = {
  eas: {
    projectId: 'a584bef5-9bb9-4c77-91dc-679921f7a6bf',
  },
  apiDevelopmentPort: 3000,
}

if (process.env.EAS_BUILD_PLATFORM === 'ios') {
  extraConfig.apiURL = process.env.API_URL
  extraConfig.iosClientId = process.env.IOS_CLIENT_ID
  extraConfig.platform = process.env.EAS_BUILD_PLATFORM
} else if (process.env.EAS_BUILD_PLATFORM === 'android') {
  extraConfig.apiURL = process.env.API_URL
  extraConfig.androidClientId = process.env.ANDROID_CLIENT_ID
  extraConfig.platform = process.env.EAS_BUILD_PLATFORM
} else {
  extraConfig.expoClientId =
    '1534417123-rirmc8ql9i0jqrqchojsl2plf5c102j6.apps.googleusercontent.com'
  extraConfig.expoClientSecret = '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'
  extraConfig.platform = 'expo'
}

export default ({ config }) => {
  return {
    ...config,
    extra: extraConfig,
  }
}
