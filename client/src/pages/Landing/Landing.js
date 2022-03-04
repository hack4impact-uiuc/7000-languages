import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import Button from 'components/Button'
import { colors } from 'theme'
import { Text } from 'native-base'
import Constants from 'expo-constants'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-google-app-auth'
import { authenticate, saveToken } from 'slices/auth.slice'
import { useDispatch } from 'react-redux'
import { saveUserIDToken } from '../../utils/auth'
import { createUser } from '../../api/api'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray.light,
  },
})

WebBrowser.maybeCompleteAuthSession()

const Landing = () => {
  /*
      Sources:
      https://docs.expo.dev/versions/latest/sdk/auth-session/
      https://stackoverflow.com/questions/66966772/expo-auth-session-providers-google-google-useauthrequest
    */
  const dispatch = useDispatch()

  const loginUser = async () => {
    const { user, idToken } = await Google.logInAsync({
      iosClientId: Constants.manifest.extra.iosClientId,
      androidClientId: Constants.manifest.extra.androidClientId,
    })

    if (idToken !== undefined) {
      const userData = {
        authID: user.id, // TODO: make sure API can take this value in
      }
      // call API
      await createUser(userData)
      // Save to Async Storage
      await saveUserIDToken(idToken)
      // Update Redux Store
      dispatch(saveToken(idToken))
      dispatch(authenticate({ loggedIn: true, idToken }))
    }
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Text
        fontWeight="regular"
        color="blue.dark"
        fontStyle="italic"
        fontSize="6xl"
      >
        Landing
      </Text>
      <Button
        title="Login to app"
        color="white"
        backgroundColor={colors.orange.dark}
        onPress={loginUser}
      />
    </View>
  )
}

export default Landing
