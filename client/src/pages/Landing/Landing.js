import React, { useState } from 'react'
import { StyleSheet, useWindowDimensions, View } from 'react-native'
import StyledButton from 'components/StyledButton'
import { colors, images } from 'theme'
import { Text, Image } from 'native-base'
import Constants from 'expo-constants'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-google-app-auth'
import { authenticate } from 'slices/auth.slice'
import { useDispatch } from 'react-redux'
import { useErrorWrap } from 'hooks'
import { AntDesign } from '@expo/vector-icons'
import {
  saveUserIDToken,
  saveUserRefreshToken,
  saveUserClientId,
} from 'utils/auth'
import { createUser } from 'api'
import Logo from '../../../assets/images/landing-logo.svg'

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.red.dark,
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  logo: {
    position: 'absolute',
    left: '5%',
  },
  quoteSection: {
    position: 'absolute',
    top: '50%',
    padding: '10%',
  },
  loginButton: {
    position: 'absolute',
    bottom: '5%',
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
  const [quote] = useState(
    '"To speak a language is to take on a world, a culture."',
  )

  const loginUser = async () => {
    await errorWrap(async () => {
      const config = {
        iosClientId: Constants.manifest.extra.iosClientId,
        androidClientId: Constants.manifest.extra.androidClientId,
      }
      const { idToken, refreshToken } = await Google.logInAsync(config)
      const guid = Google.getPlatformGUID(config)
      const clientId = `${guid}.apps.googleusercontent.com`
      if (idToken !== undefined && refreshToken !== undefined) {
        const userData = {
          idToken,
        }
        // call API
        await createUser(userData)
        // Save to Secure Store
        await saveUserIDToken(idToken)
        await saveUserRefreshToken(refreshToken)
        await saveUserClientId(clientId)
        // Update Redux Store
        dispatch(authenticate({ loggedIn: true, idToken }))
      }
    })
  }

  const window = useWindowDimensions()

  return (
    <View style={styles.root}>
      <Image
        source={images.background_landing}
        alt="7000 Languages red background with names of endangered languages"
        style={styles.backgroundImage}
      />

      <Logo height={160} width={160} style={styles.logo} />

      <View style={styles.quoteSection}>
        <Text
          fontWeight="regular"
          color="white.dark"
          fontFamily="heading"
          fontStyle="normal"
          fontSize={`${window.height}` / 30}
        >
          {quote}
        </Text>

        <Text fontWeight="regular" color="white.dark" fontSize="2xl">
          {' - '}Frantz Fanon
        </Text>
      </View>

      <StyledButton
        title="  Continue with Google"
        leftIcon={(
          <AntDesign
            name="google"
            size={`${window.height}` / 25}
            color={colors.red.dark}
          />
        )}
        variant="secondary"
        onPress={loginUser}
        style={styles.loginButton}
        fontSize={`${window.height}` / 40}
      />
    </View>
  )
}

export default Landing
