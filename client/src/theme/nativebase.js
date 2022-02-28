import { extendTheme } from 'native-base'
import colors from './colors'

// Custom NativeBase theme
const theme = extendTheme({
  colors,
  components: {
  Button: {
    // Can simply pass default props to change default behaviour of components.
    defaultProps: {
      px: 20,
      py: 4,
      my: 1,
      borderRadius: 12,
    }, 

    
    variants: {
      primary: {
        color: "white.dark",
        bg: "red.dark",
      },
      secondary: {
        color: "red.dark",
        bg: "white.dark"
      },
      tertiary: {
        bg: "red.light",
        variants:"ghost"
      }, 
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
