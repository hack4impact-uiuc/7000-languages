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
          bg: 'red.medium_dark',
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
        learner_primary: {
          bg: 'blue.dark',
          w: '100%',
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
          bg: 'red.medium_dark',
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
            color: 'red.medium_dark',
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
          borderColor: 'red.medium_dark',
          _text: {
            fontSize: 20,
            color: 'red.medium_dark',
            fontFamily: 'heading',
          },
        },
        small: {
          bg: 'red.light',
          px: 0,
          py: 4,
          _text: {
            color: 'red.medium_dark',
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
          w: '50%',
          mx: 2,
          my: 2,
          h: 10,
          _text: {
            color: 'red.medium_dark',
            fontFamily: 'heading',
          },
        },
        learner: {
          bg: 'blue.light',
          borderColor: 'white.dark',
          borderRadius: 70,
          w: '50%',
          mx: 2,
          h: 10,
          my: 2,
          _text: {
            color: 'blue.dark',
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
            color: 'red.medium_dark',
            fontFamily: 'heading',
          },
        },
        settings: {
          bg: 'gray.300',
          borderRadius: 10,
          h: '50',
          minW: 100,
          my: 3,
          mx: 5,
          _text: {
            color: 'gray.dark',
            fontFamily: 'heading',
          },
        },
        learner_secondary: {
          bg: 'blue.medium_light',
          w: '90%',
          h: 60,
          my: 3,
          borderRadius: 40,
          _text: {
            color: 'blue.darker',
            fontFamily: 'heading',
          },
        },
        learner_in_progress: {
          bg: 'gray.light',
          borderWidth: 2,
          borderColor: colors.gray.semi_light,
          borderRadius: 65,
          w: '90%',
          h: 65,
          my: 3,
          _text: {
            fontFamily: 'heading',
          },
        },
        learner_incorrect: {
          bg: 'gray.semi_light',
          borderWidth: 2,
          borderColor: colors.gray.semi_light,
          borderRadius: 65,
          w: '90%',
          h: 65,
          my: 3,
          _text: {
            color: 'white.medium',
            fontFamily: 'heading',
          },
        },
        learner_correct: {
          bg: 'green.medium_light',
          borderWidth: 2,
          borderColor: colors.green.medium_light,
          borderRadius: 65,
          w: '90%',
          h: 65,
          my: 3,
          _text: {
            fontFamily: 'heading',
          },
        },
        learner_selected: {
          bg: '#04AFB2',
          borderWidth: 3,
          borderColor: colors.blue.darker,
          borderRadius: 40,
          w: '90%',
          h: 65,
          my: 3,
          _text: {
            color: 'blue.light',
            fontFamily: 'heading',
          },
        },
        learner_filter_inactive: {
          bg: 'white.dark',
          borderWidth: 2,
          borderColor: colors.gray.medium_darker,
          borderRadius: 10,
          my: 2,
          px: 20,
          py: 4,
          _text: {
            fontSize: '2xl',
            color: 'gray.medium',
            fontFamily: 'body',
            w: '100%',
          },
        },
        learner_filter_active: {
          bg: 'blue.darker',
          borderWidth: 2,
          borderColor: colors.blue.darker,
          borderRadius: 10,
          my: 2,
          px: 20,
          py: 4,
          _text: {
            fontSize: '2xl',
            color: 'white.dark',
            fontFamily: 'heading',
            w: '100%',
          },
        },
        learner_cancel: {
          bg: colors.gray.medium_darker,
          my: 2,
          px: 20,
          py: 4,
          _text: {
            fontSize: '2xl',
            color: 'gray.dark',
            fontFamily: 'heading',
            w: '100%',
          },
        },
        congratulations: {
          bg: colors.gray.medium,
          my: 2,
          px: 20,
          py: 4,
          w: '90%',
          h: 65,
          _text: {
            fontSize: '2xl',
            color: 'white.dark',
            fontFamily: 'heading',
            w: '100%',
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
