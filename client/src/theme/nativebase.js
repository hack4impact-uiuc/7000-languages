import { extendTheme } from 'native-base'
import colors from './colors'

// Custom NativeBase theme
const theme = extendTheme({
  colors,
  fontConfig: {
    GT_Haptik: {
      regular: {
        normal: 'GT_Haptik_regular',
        italic: 'GT_Haptik_regular_italic',
        rotalic: 'GT_Haptik_rotalic',
      },
      bold: {
        normal: 'GT_Haptik_bold',
        italic: 'GT_Haptik_bold_italic',
        rotalic: 'GT_Haptik_rotalic',
      },
    },
  },
  fonts: {
    heading: 'GT_Haptik',
    body: 'GT_Haptik',
    mono: 'GT_Haptik',
  },
})

export default theme
