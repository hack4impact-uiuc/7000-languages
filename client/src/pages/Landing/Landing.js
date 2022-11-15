import React, { useEffect, useState } from 'react'
import { StyleSheet, useWindowDimensions, View } from 'react-native'
import StyledButton from 'components/StyledButton'
import { colors, images } from 'theme'
import { Text, Image } from 'native-base'
import Constants from 'expo-constants'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { authenticate } from 'slices/auth.slice'
import { useDispatch } from 'react-redux'
import { useErrorWrap } from 'hooks'
import { AntDesign } from '@expo/vector-icons'
import { saveUserIDToken } from 'utils/auth'
import { createUser } from 'api'
import i18n from 'utils/i18n'
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
  const config = {
    responseType: 'id_token',
    expoClientId: Constants.manifest.extra.expoClientId,
    iosClientId: Constants.manifest.extra.iosClientId,
    androidClientId: Constants.manifest.extra.androidClientId,
    scopes: ['profile', 'email'],
  }
  const [quote] = useState(`${i18n.t('dialogue.landingQuote')}`)
  const [, response, promptAsync] = Google.useAuthRequest(config, {
    useProxy: true,
  })

  useEffect(() => {
    errorWrap(async () => {
      if (response?.type === 'success') {
        const { id_token: idToken } = response.params
        if (idToken !== undefined) {
          const userData = {
            idToken,
          }
          // Save to Secure Store
          await saveUserIDToken(idToken)

          // Call API, creating a user record if the user has logged in for the first time
          await createUser(userData)

          /*
            TODO: Add back support for Refresh Tokens.
            Make sure to call below:

            await saveUserRefreshToken(refreshToken);
            await saveUserClientId(clientId);
          */

          // Update Redux Store
          dispatch(authenticate({ loggedIn: true }))
        }
      }
    })
  }, [response])

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
        title={i18n.t('actions.continueGoogle')}
        leftIcon={
          <AntDesign
            name="google"
            size={`${window.height}` / 25}
            color={colors.red.dark}
          />
        }
        variant="secondary"
        onPress={() => promptAsync()}
        style={styles.loginButton}
        fontSize={`${window.height}` / 40}
      />
    </View>
  )
}

export default Landing
