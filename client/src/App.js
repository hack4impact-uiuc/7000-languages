import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import store from 'utils/store'
import 'utils/ignore'

// assets
import { imageAssets } from 'theme/images'
import { fontAssets } from 'theme/fonts'
import { NativeBaseProvider } from 'native-base'
import { nativebase } from 'theme'
import Navigator from './navigator'

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
  console.log("is this working????")

  return didLoad ? (
    <Provider store={store}>
      <NativeBaseProvider theme={nativebase}>
        <Navigator />
      </NativeBaseProvider>
    </Provider>
  ) : (
    <NativeBaseProvider theme={nativebase}>
      <View />
    </NativeBaseProvider>
  )
}

export default App
