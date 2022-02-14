import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import store from 'utils/store'
import 'utils/ignore'

// assets
import { imageAssets } from 'theme/images'
import { fontAssets } from 'theme/fonts'
import { NativeBaseProvider, extendTheme } from 'native-base'
import Navigator from './navigator'

// Custom NativeBase theme
const theme = extendTheme({
  fontConfig: {
    GT_Haptik: {
      regular: {
        normal: "GT_Haptik_regular",
        italic: "GT_Haptik_regular_italic",
        rotalic: "GT_Haptik_rotalic",
      },
      bold: {
        normal: "GT_Haptik_bold",
        italic: "GT_Haptik_bold_italic",
        rotalic: "GT_Haptik_rotalic",
      },
    },
  },
  fonts: {
    heading: "GT_Haptik",
    body: "GT_Haptik",
    mono: "GT_Haptik",
  },
});

const App = () => {
  const [didLoad, setDidLoad] = useState(false)

  // assets preloading
  const handleLoadAssets = async () => {
    await Promise.all([...imageAssets, ...fontAssets])
    setDidLoad(true)
  }

  useEffect(() => {
    handleLoadAssets()
  }, [])

  return didLoad ? (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <Navigator />
      </NativeBaseProvider>
    </Provider>
  ) : (
    <NativeBaseProvider theme={theme}>
      <View />
    </NativeBaseProvider>
  )
}

export default App
