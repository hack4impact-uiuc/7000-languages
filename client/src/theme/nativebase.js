import { extendTheme } from 'native-base'
import colors from './colors'

// Custom NativeBase theme
const theme = extendTheme({
  colors,
  components: {
    Input: {
      baseStyle: {
        size: "20",
        //lineHeight: "xl",
        selectionColor: 'coolGray.800'
      },
      defaultProps: { size: 'sm' },
    },

    Text: {
      baseStyle: {
        fontFamily: 'body',
        fontWeight: 'regular',
        fontSize: 'xl',
      },
    },
    Button: {
      // Can simply pass default props to change default behaviour of components.
      baseStyle: {
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
          px: 0,
          py: 4,
          _text: {
            color: 'red.dark',
            fontFamily: 'GT_Haptik_bold',
          },
        },
        complete: {
          bg: 'green.light',
          borderColor: 'white.dark',
          borderRadius: 70,
          py: 0,
          _text: {
            py: 0,
            color: 'green.medium',
            fontFamily: 'GT_Haptik_bold',
          },
        },
        incomplete: {
          bg: 'orange.light',
          borderColor: 'white.dark',
          borderRadius: 70,
          py: 10,
          _text: {
            color: 'orange.medium',
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
