import { extendTheme } from 'native-base'
import colors from './colors'

// Custom NativeBase theme
const theme = extendTheme({
  colors,
  components: {
    Input: {
      baseStyle: {
        backgroundColor: 'gray.medium_light',
        borderColor: 'gray.medium_light',
        fontFamily: 'GT_Haptik_regular',
        selectionColor: 'black',
        _focus: {
          borderColor: 'blue.medium',
          _hover: { borderColor: 'primary.600' },
        },
        my: 2,
      },
      defaultProps: {
        size: 'xl',
        backgroundColor: 'gray.medium_light',
        borderWidth: 1,
        borderColor: 'gray.medium_dark',
      },
    },
    TextArea: {
      baseStyle: {
        backgroundColor: 'gray.medium_light',
        fontFamily: 'GT_Haptik_regular',
        selectionColor: 'black',
        _focus: {
          borderColor: 'blue.medium',
          _hover: { borderColor: 'primary.600' },
        },
        my: 2,
      },
      defaultProps: {
        size: 'xl',
        backgroundColor: 'gray.medium_light',
        borderWidth: 1,
        borderColor: 'gray.medium_dark',
      },
    },
    Text: {
      baseStyle: {
        fontFamily: 'body',
        fontStyle: 'normal',
        fontWeight: 'regular',
        fontSize: 'xl',
      },
    },
    Button: {
      baseStyle: {
        borderRadius: 8,
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
            fontFamily: 'heading',
          },
        },
        primary_short: {
          bg: 'red.dark',
          w: '67%',
          _text: {
            color: 'white.dark',
            fontFamily: 'heading',
          },
        },
        secondary: {
          bg: 'white.dark',
          w: '90%',
          my: 2,
          py: 4,
          _text: {
            color: 'red.dark',
            fontFamily: 'heading',
          },
        },
        image_picker: {
          bg: 'red.light',
          w: '100%',
          my: 2,
          borderStyle: 'dashed',
          borderWidth: 2,
          borderRadius: 1,
          borderColor: 'red.dark',
          _text: {
            fontSize: 20,
            color: 'red.dark',
            fontFamily: 'heading',
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
            fontFamily: 'heading',
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
            fontFamily: 'heading',
          },
        },
        incomplete: {
          bg: 'orange.light',
          borderColor: 'white.dark',
          borderRadius: 70,
          py: 10,
          _text: {
            color: 'orange.medium',
            fontFamily: 'heading',
          },
        },
        contributor: {
          bg: 'red.light',
          borderColor: 'white.dark',
          borderRadius: 70,
          my: 3,
          _text: {
            color: 'red.dark',
            fontFamily: 'heading',
          },
        },
        manage: {
          bg: 'red.light',
          borderRadius: 10,
          minW: 100,
          my: 3,
          mx: 5,
          _text: {
            color: 'red.dark',
            fontFamily: 'heading',
          },
        },
      },
    },
  },
  fontConfig: {
    GT_Haptik_font: {
      regular: {
        // weight
        normal: 'GT_Haptik_regular', // style
        italic: 'GT_Haptik_regular_italic',
        rotalic: 'GT_Haptik_rotalic',
      },
    },
    GT_Haptik_bold_font: {
      regular: {
        normal: 'GT_Haptik_bold',
        italic: 'GT_Haptik_bold_italic',
        rotalic: 'GT_Haptik_rotalic',
      },
    },
  },
  fonts: {
    heading: 'GT_Haptik_bold_font',
    body: 'GT_Haptik_font',
    mono: 'GT_Haptik_font',
  },
})

export default theme
