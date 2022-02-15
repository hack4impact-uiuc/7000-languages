import { extendTheme } from 'native-base'

// Custom NativeBase theme
const theme = extendTheme({
  colors: {
    blue: {
      red: {
        100: '#F9EDED',
        300: '#E9BAB6',
        500: '#CE584E',
      },
      blue: {
        100: '#E9F6F7',
        300: '#AADDDF',
        500: '#4FACB0',
      },
      orange: {
        100: '#FFF1DD',
        300: '#FFC989',
        500: '#E59A41',
      },
      green: {
        100: '#F6FBD4',
        300: '#D8E48B',
        500: '#C0D152',
      },
      gray: {
        100: '#EFEFEF',
        300: '#A8AFB4',
        500: '#5B6165',
        800: '#060606',
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
