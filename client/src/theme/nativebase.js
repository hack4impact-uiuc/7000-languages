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
        borderRadius: 12,
      },
      variants: {
        primary: {
          bg: 'red.dark',
          w: '90%',
          my: 2,
          px: 20,
          py: 4,
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
          my: 2,
          px: 20,
          py: 4,
          _text: {
            color: 'red.dark',
            fontFamily: 'GT_Haptik_bold',
          },
        },
        tertiary: {
          bg: 'gray.medium:alpha.00',
          w: '90%',
          my: 2,
          px: 20,
          py: 4,
          borderColor: 'white.dark',
          borderWidth: 2,
          _text: {
            color: 'white.dark',
            fontFamily: 'GT_Haptik_bold',
          },
        },
        small: {
          bg: 'red.light',
          borderColor: 'white.dark',
          borderWidth: 2,
          px: 2,
          py: 4,
          _text: {
            color: 'red.dark',
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
