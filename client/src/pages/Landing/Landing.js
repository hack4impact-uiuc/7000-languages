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
import { createUser } from 'api'
import i18n from 'utils/i18n'
import { exchangeAuthCode } from 'utils/auth'
import Logo from '../../../assets/images/landing-logo.svg'

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.red.medium_dark,
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
  const dispatch = useDispatch()
  const errorWrap = useErrorWrap()

  /*
    Sources:
    https://docs.expo.dev/versions/latest/sdk/auth-session/
    https://stackoverflow.com/questions/71095191/refresh-token-with-expo-auth-sessions-google
  */
  const config = {
    expoClientId: Constants.manifest.extra.expoClientId,
    scopes: ['profile'],
    responseType: 'code',
    shouldAutoExchangeCode: false,
    prompt: 'consent',
    extraParams: {
      access_type: 'offline',
    },
  }

  const [quote] = useState(`${i18n.t('dialogue.landingQuote')}`)
  const [request, response, promptAsync] = Google.useAuthRequest(config)

  useEffect(() => {
    errorWrap(async () => {
      if (response?.type === 'success') {
        const { code } = response.params
        if (code !== undefined) {
          exchangeAuthCode(
            code,
            config.expoClientId,
            Constants.manifest.extra.clientSecret,
            request?.codeVerifier,
          ).then(async ({ success, message, idToken }) => {
            if (success) {
              const userData = {
                idToken,
              }
              await createUser(userData)
              dispatch(authenticate({ loggedIn: true }))
            } else {
              console.error('exchangeAuthCode(): ', message)
            }
          })
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
        leftIcon={(
          <AntDesign
            name="google"
            size={`${window.height}` / 25}
            color={colors.red.medium_dark}
          />
        )}
        variant="secondary"
        onPress={() => promptAsync()}
        style={styles.loginButton}
        fontSize={`${window.height}` / 40}
      />
    </View>
  )
}

export default Landing
