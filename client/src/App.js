import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import 'utils/ignore'

// assets
import { imageAssets } from 'theme/images'
import { fontAssets } from 'theme/fonts'
import { NativeBaseProvider } from 'native-base'
import { nativebase } from 'theme'
import Navigator from './navigator'
import store from './redux/store'

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
