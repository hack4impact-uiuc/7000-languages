import { extendTheme } from 'native-base'
import colors from './colors'

// Custom NativeBase theme
const theme = extendTheme({
  colors,
  components: {
    Text: {
      baseStyle: {
        fontFamily: 'body',
        fontWeight: 'regular',
        fontSize: 'xl',
      },
    },
    Button: {
      // Can simply pass default props to change default behaviour of components.
      defaultProps: {
        px: 0,
        py: 4,
        my: 2,
        borderRadius: 12,
      },
      variants: {
        primary: {
          bg: 'red.dark',
          w: '90%',
          _text: {
            fontSize: '2xl',
            color: 'white.dark',
            fontFamily: 'GT_Haptik_bold',
          },
        },
        primary_short: {
          bg: 'red.dark',
          w: '67%',
          _text: {
            color: 'white.dark',
            fontFamily: 'GT_Haptik_bold',
          },
        },
        secondary: {
          bg: 'white.dark',
          w: '90%',
          _text: {
            color: 'red.dark',
            fontFamily: 'GT_Haptik_bold',
          },
        },
        tertiary: {
          bg: 'gray.medium:alpha.00',
          w: '90%',
          borderColor: 'white.dark',
          borderWidth: 2,
          _text: {
            color: 'white.dark',
            fontFamily: 'GT_Haptik_bold',
          },
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
    },
    GT_Haptik_bold: {
      regular: {
        normal: 'GT_Haptik_bold',
        italic: 'GT_Haptik_bold_italic',
        rotalic: 'GT_Haptik_rotalic',
      },
    },
  },
  fonts: {
    heading: 'GT_Haptik_bold',
    body: 'GT_Haptik',
    mono: 'GT_Haptik',
  },
})

export default theme
