import { extendTheme } from 'native-base'
import colors from './colors'

// Custom NativeBase theme
const theme = extendTheme({
  colors,
  components: {
  Button: {
    // Can simply pass default props to change default behaviour of components.
    baseStyle: {
      paddingVertical: 12,
      paddingHorizontal: 32,
      alignItems:'center',
      justifyContent:'center',
      borderRadius: 5,
    },

    // Fix colors to represent figma, can do later 
    primary: {
       // change text color to opposite 
      backgroundColor: colors.red.dark
    },
    secondary: {
       // change text color to opposite 
      backgroundColor: colors.red.dark
    },
    tertiary: {
      // need to change to white
      // change text color to opposite 
      backgroundColor: colors.gray.light
    }, 
  },
},
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
