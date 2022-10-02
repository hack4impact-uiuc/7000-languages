import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
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
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.red.dark,
  },
  button: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 60,
  },
  logo: {
    position: 'absolute',
    left: 20,
    bottom: 720,
  },
  quote: {
    position: 'absolute',
    left: 40,
    bottom: 200,
  },

  quote2: {
    position: 'absolute',
    left: 5,
    bottom: 1,
  },
  backgroundImage: {
    width: '100%',
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
    '"To speak a language is \n to take on a world, a\n culture."\n',
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

  return (
    <View style={styles.root}>
      <Image
        source={images.background_landing}
        style={styles.backgroundImage}
        alt="description of image"
      />
      <View style={styles.button}>
        <StyledButton
          title="Continue with Google"
          leftIcon={
            <AntDesign name="google" size={24} color={colors.red.dark} />
          }
          variant="secondary"
          onPress={loginUser}
          style={{ paddingRight: 60 }}
        />
      </View>

      <View style={styles.logo}>
        <Logo height={160} width={160} />
      </View>

      <View style={styles.quote}>
        <Text
          fontWeight="regular"
          color="white.dark"
          fontFamily="heading"
          fontStyle="normal"
          fontSize="3xl"
        >
          {quote}
        </Text>

        <Text
          style={styles.quote2}
          fontWeight="regular"
          color="white.dark"
          fontSize="2xl"
        >
          - Frantz Fanon
        </Text>
      </View>
    </View>
  )
}

export default Landing
