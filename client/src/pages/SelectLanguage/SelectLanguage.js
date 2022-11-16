import React, { useState, useEffect } from 'react'
import {
  Alert, StyleSheet, useWindowDimensions, View,
} from 'react-native'
import StyledButton from 'components/StyledButton'
import { colors, images } from 'theme'
import { Text, Image } from 'native-base'
import * as WebBrowser from 'expo-web-browser'
import { AntDesign } from '@expo/vector-icons'
import i18n from 'utils/i18n'
import PropTypes from 'prop-types'
import * as SecureStore from 'expo-secure-store'
import Logo from '../../../assets/images/landing-logo.svg'
import { CURRENT_LANGUAGE } from '../../utils/constants'

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
  const window = useWindowDimensions()

  const retrieveData = async () => {
    try {
      const value = await SecureStore.getItemAsync(CURRENT_LANGUAGE)
      return value === 'French' ? 'French' : 'English'
    } catch (error) {
      // Error retrieving data
      Alert.alert('Error retrieving data.')
    }
    return null
  }

  const storeLanguage = async (language) => {
    try {
      await SecureStore.setItemAsync(CURRENT_LANGUAGE, language)
    } catch (error) {
      // Error saving data
      Alert.alert('Error saving data.')
    }
  }

  const [language, setLanguage] = useState(retrieveData())
  useEffect(() => {
    if (retrieveData() === 'English') {
      setLanguage('English')
    }
    if (retrieveData() === 'French') {
      setLanguage('French')
    }
  })

  const handlePressEnglish = () => {
    i18n.locale = 'en'
    storeLanguage('English')
  }

  const handlePressFrench = () => {
    i18n.locale = 'fr'
    storeLanguage('French')
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
          color={colors.red.dark}
          fontSize={`${window.height}` / 60}
          fontFamily={language === 'English' ? 'heading' : 'body'}
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
          color={colors.red.dark}
          fontSize={`${window.height}` / 60}
          fontFamily={language === 'French' ? 'heading' : 'body'}
          top="18%"
          onPress={handlePressFrench}
        >
          Procéder en français
        </Text>
      </View>

      <StyledButton
        title={retrieveData() ? 'Next' : 'Suivant'}
        rightIcon={(
          <AntDesign
            name="right"
            size={`${window.height}` / 45}
            color={colors.white.light}
          />
        )}
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
