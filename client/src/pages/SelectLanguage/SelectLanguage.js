import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  View,
} from 'react-native'
import StyledButton from 'components/StyledButton'
import { colors, images } from 'theme'
import { Text, Image } from 'native-base'
import * as WebBrowser from 'expo-web-browser'
import { AntDesign } from '@expo/vector-icons'
import i18n from 'utils/i18n'
import PropTypes from 'prop-types'
import { ENGLISH, FRENCH } from 'utils/constants'
import { storeLanguage, getDeviceLocale } from 'utils/i18n/utils'
import Logo from '../../../assets/images/landing-logo.svg'

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.red.medium_dark,
    width: '100%',
    height: '100%',
  },
  languageSelectContainer: {
    position: 'absolute',
    top: '20%',
    width: '100%',
    height: '60%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
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
    padding: '10%',
    borderRadius: 10,
    maxWidth: '80%',
  },
  nextButton: {
    position: 'absolute',
    bottom: '5%',
    justifyContent: 'flex-end',
    right: '7%',
  },
})

WebBrowser.maybeCompleteAuthSession()

const SelectLanguage = ({ navigation }) => {
  const window = useWindowDimensions()
  const [language, setLanguage] = useState(ENGLISH)

  useEffect(() => {
    const setDefaultLanguage = async () => {
      const deviceLocale = getDeviceLocale()
      setLanguage(deviceLocale)
    }
    setDefaultLanguage()
  }, [getDeviceLocale, setLanguage])

  const saveLanguage = async () => {
    await storeLanguage(language)
    i18n.locale = language
    navigation.navigate('Landing')
  }

  return (
    <View style={styles.root}>
      <Image
        source={images.background_landing}
        alt="7000 Languages red background with names of endangered languages"
        style={styles.backgroundImage}
      />

      <Logo height={160} width={160} style={styles.logo} />

      <View style={styles.languageSelectContainer}>
        <TouchableOpacity
          style={{
            ...styles.textSection,
            backgroundColor:
              language === FRENCH ? colors.red.light : colors.white.light,
            borderColor:
              language === ENGLISH ? colors.red.dark : colors.white.light,
            borderWidth: 3,
            borderRadius: 20,
          }}
          top="31%"
          width="97%"
          onPress={() => setLanguage(ENGLISH)}
        >
          <Text
            fontSize={`${window.height}` / 45}
            fontFamily={language === ENGLISH ? 'heading' : 'body'}
          >
            Hello!
          </Text>
          <Text
            fontSize={`${window.height}` / 45}
            fontFamily={language === ENGLISH ? 'heading' : 'body'}
          >
            Welcome to 7000 Languages
          </Text>
          <Text
            color={colors.red.medium_dark}
            fontSize={`${window.height}` / 60}
            fontFamily={language === ENGLISH ? 'heading' : 'body'}
            top="18%"
          >
            Proceed in English
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            ...styles.textSection,
            backgroundColor:
              language === FRENCH ? colors.red.light : colors.white.light,
            borderColor:
              language === FRENCH ? colors.red.dark : colors.white.light,
            borderWidth: 3,
            borderRadius: 20,
          }}
          top="55%"
          width="97%"
          onPress={() => setLanguage(FRENCH)}
        >
          <Text
            fontSize={`${window.height}` / 45}
            fontFamily={language === FRENCH ? 'heading' : 'body'}
          >
            Bonjour!
          </Text>
          <Text
            color="black"
            fontFamily={language === FRENCH ? 'heading' : 'body'}
            fontSize={`${window.height}` / 45}
          >
            Bienvenue sur 7000 Langues
          </Text>
          <Text
            color={colors.red.medium_dark}
            fontSize={`${window.height}` / 60}
            fontFamily={language === FRENCH ? 'heading' : 'body'}
            top="18%"
          >
            Procéder en français
          </Text>
        </TouchableOpacity>
      </View>

      <StyledButton
        title={language === ENGLISH ? 'Next' : 'Suivant'}
        rightIcon={
          <AntDesign
            name="right"
            size={`${window.height}` / 45}
            color={colors.white.light}
          />
        }
        style={styles.nextButton}
        fontSize={`${window.height}` / 40}
        onPress={saveLanguage}
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
