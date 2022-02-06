import * as Font from 'expo-font'

// fonts preloading
export const fontAssets = [
  {
    GT_Haptik_regular: require('../../assets/fonts/GT-Haptik-Regular.ttf'),
  },
  {
    GT_Haptik_regular_italic: require('../../assets/fonts/GT-Haptik-Regular-Oblique.ttf'),
  },
  {
    GT_Haptik_bold: require('../../assets/fonts/GT-Haptik-Bold.ttf'),
  },
  {
    GT_Haptik_bold_italic: require('../../assets/fonts/GT-Haptik-Bold-Oblique.ttf'),
  },
  {
    GT_Haptik_rotalic: require('../../assets/fonts/GT-Haptik-Regular-Rotalic.ttf'),
  },
  {
    GT_Haptik_bold_rotalic: require('../../assets/fonts/GT-Haptik-Bold-Rotalic.ttf'),
  },
  {
    GT_Haptik_oblique: require('../../assets/fonts/GT-Haptik-Regular-Oblique.ttf'),
  },
  {
    GT_Haptik_bold_oblique: require('../../assets/fonts/GT-Haptik-Bold-Oblique.ttf'),
  },
].map((x) => Font.loadAsync(x))

const fonts = {
  GT_Haptik: {
    regular: 'GT_Haptik_regular',
    regularItalic: 'GT_Haptik_regular_italic',
    bold: 'GT_Haptik_bold',
    boldItalic: 'GT_Haptik_bold_italic',
    rotalic: 'GT_Haptik_rotalic',
    boldRotalic: 'GT_Haptik_bold_rotalic',
    oblique: 'GT_Haptik_rotalic',
    boldOblique: 'GT_Haptik_bold_rotalic',
  },
}

export default fonts
