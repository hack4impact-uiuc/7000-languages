import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import StyledButton from 'components/StyledButton'
import { colors, images } from 'theme'
import { Text, Image } from 'native-base'
import Constants from 'expo-constants'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-google-app-auth'
import { authenticate, saveToken } from 'slices/auth.slice'
import { useDispatch } from 'react-redux'
import { saveUserIDToken } from '../../utils/auth'
import { createUser } from '../../api/api'
import { AntDesign } from '@expo/vector-icons'
import Logo from '../../../assets/images/landing-background.png'

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
    marginBottom: 36
  },
  logo: {
    position: 'absolute',
    left: 20,
    bottom: 680
  },
  quote: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
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
    const { idToken } = await Google.logInAsync({
      iosClientId: Constants.manifest.extra.iosClientId,
      androidClientId: Constants.manifest.extra.androidClientId,
    })

    if (idToken !== undefined) {
      const userData = {
        idToken,
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

      <Image source={images.background_landing} />

      <View style={styles.button}>
        <StyledButton
          title="Continue with Google"
          leftIcon={<AntDesign name="google" size={24} color={colors.red.dark} />}
          variant="secondary"
          onPress={loginUser}
        />
      </View>

      <View style={styles.logo}>
        <Logo height={160} width={160} />
      </View>

      <View style={styles.quote} >
        <Text
          fontWeight="regular"
          color="white.dark"
          fontStyle="GT_Haptik_bold"
          fontSize="4xl"
        >
          "To speak a language is {'\n'}
          to take on a world,{'\n'}
          a culture."
          {'\n'}
          - Frantz Fanon

        </Text>


      </View>



    </View>
  )
}

export default Landing
