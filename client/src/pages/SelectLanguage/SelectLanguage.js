import React, { useState } from 'react'
import { StyleSheet, useWindowDimensions, View, Alert } from 'react-native'
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
import i18n from 'utils/i18n'
import Logo from '../../../assets/images/landing-logo.svg'
import PropTypes from 'prop-types'

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
  textContainer: {
    display: 'flex',
  },
  textSection: {
    position: 'absolute',
    top: '50%',
    padding: '10%',
    backgroundColor: 'white',
    borderRadius: 10,
    maxWidth: '80%',
  },
  loginButton: {
    position: 'absolute',
    bottom: '5%',
    justifyContent: 'flex-end',
    right: '7%',
  },
})

WebBrowser.maybeCompleteAuthSession()

const SelectLanguage = ({ navigation }) => {
  /*
      Sources:
      https://docs.expo.dev/versions/latest/sdk/auth-session/
      https://stackoverflow.com/questions/66966772/expo-auth-session-providers-google-google-useauthrequest
    */
  const dispatch = useDispatch()
  const errorWrap = useErrorWrap()
  const [quote] = useState(`${i18n.t('dialogue.landingQuote')}`)

  /*
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
        dispatch(authenticate({ loggedIn: true }))
      }
    })
  }
  */

  const window = useWindowDimensions()

  const [isEnglish, setIsEnglish] = useState(true)

  const handlePressEnglish = () => {
    Alert.alert('Translating to English...')
    i18n.locale = 'en'
    setIsEnglish(true)
  }

  const handlePressFrench = () => {
    Alert.alert('Translating to French...')
    i18n.locale = 'fr'
    setIsEnglish(false)
  }

  return (
    <View style={styles.root}>
      <Image
        source={images.background_landing}
        alt="7000 Languages red background with names of endangered languages"
        style={styles.backgroundImage}
      />

      <Logo height={160} width={160} style={styles.logo} />

      <View style={styles.textSection} top="31%" width="97%">
        <Text fontSize={`${window.height}` / 45}>Hello!</Text>
        <Text fontSize={`${window.height}` / 45}>
          Welcome to 7000 Languages
        </Text>
        <Text
          color={isEnglish ? colors.red.dark : colors.black}
          fontSize={`${window.height}` / 60}
          // fontWeight={isEnglish ? 'bold' : 'normal'}
          top="18%"
          onPress={handlePressEnglish}
        >
          Proceed in English
        </Text>
      </View>

      <View style={styles.textSection} top="55%" width="97%">
        <Text fontSize={`${window.height}` / 45}>Bonjour!</Text>
        <Text
          color="black"
          fontFamily="body"
          fontSize={`${window.height}` / 45}
        >
          Bienvenue sur 7000 Langues
        </Text>
        <Text
          color={!isEnglish ? colors.red.dark : colors.black}
          fontSize={`${window.height}` / 60}
          // fontWeight={!isEnglish ? 'bold' : 'normal'}
          top="18%"
          onPress={handlePressFrench}
        >
          Procéder en français
        </Text>
      </View>

      <StyledButton
        title="Next"
        rightIcon={
          <AntDesign
            name="right"
            size={`${window.height}` / 45}
            color={colors.white.light}
          />
        }
        style={styles.loginButton}
        fontSize={`${window.height}` / 40}
        onPress={() => {
          navigation.navigate('Landing', { from: 'SelectLanguage' })
        }}
      />
    </View>
  )
}

// Home Base Case Object Fields
SelectLanguage.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

SelectLanguage.defaultProps = {
  navigation: { navigate: () => null },
}

export default SelectLanguage
