import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import StyledButton from 'components/StyledButton'
import { colors } from 'theme'
import { Text } from 'native-base'
import Constants from 'expo-constants'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-google-app-auth'
import { authenticate, saveToken } from 'slices/auth.slice'
import { useDispatch } from 'react-redux'
import { createUser } from 'api'
import useErrorWrap from 'hooks/useErrorWrap'
import { saveUserIDToken } from '../../utils/auth'

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
  const errorWrap = useErrorWrap()

  const loginUser = async () => {
    await errorWrap(
      async () => {
        const { idToken } = await Google.logInAsync({
          iosClientId: Constants.manifest.extra.iosClientId,
          androidClientId: Constants.manifest.extra.androidClientId,
        })

        if (idToken !== undefined) {
          const userData = {
            idToken: '123',
          }

          // call API
          await createUser(userData)
          // Save to Async Storage
          await saveUserIDToken(idToken)
          // Update Redux Store
          dispatch(saveToken(idToken))
          dispatch(authenticate({ loggedIn: true, idToken }))
        }
      },
      () => {
        console.log('success')
      },
      () => {
        console.log('error')
      },
    )
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
      <StyledButton
        title="Login to app"
        variant="primary"
        onPress={loginUser}
      />
    </View>
  )
}

export default Landing
