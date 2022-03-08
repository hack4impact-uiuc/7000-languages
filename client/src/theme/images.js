import { Asset } from 'expo-asset'

const images = {
  // logo_sm: require('../../assets/images/logo-sm-black.png'),
  // logo_lg: require('../../assets/images/logo-lg-black.png'),
  background_landing: require('../../assets/images/landing-background.png'),
  landing_logo: require('../../assets/images/landing-logo.svg')

}

// image preloading
export const imageAssets = Object.keys(images).map((key) => Asset.fromModule(images[key]).downloadAsync())

export default images
