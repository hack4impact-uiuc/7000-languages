import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { colors, images } from 'theme'
import { Image } from 'native-base'
import { retrieveLanguage } from 'utils/i18n/utils'
import PropTypes from 'prop-types'
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

const Intro = ({ navigation }) => {
  /*
            The purpose of this page is to show our App's Intro Screen while we make a background fetch to Secure Store
            and see if the user has opened this app before. If they have, we navigate to Landing or the rest of the app.
            Otherwise, we show the welcome page where they scan select the app's language.
        */
  useEffect(() => {
    const navigateUser = async () => {
      const appLanguage = await retrieveLanguage()
      const screen = appLanguage === null ? 'SelectLanguage' : 'Landing'
      navigation.navigate(screen)
    }

    navigateUser()
  }, [retrieveLanguage])

  return (
    <View style={styles.root}>
      <Image
        source={images.background_landing}
        alt="7000 Languages red background with names of endangered languages"
        style={styles.backgroundImage}
      />

      <Logo height={160} width={160} style={styles.logo} />
    </View>
  )
}

Intro.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }),
}

Intro.defaultProps = {
  navigation: { navigate: () => null },
}

export default Intro
