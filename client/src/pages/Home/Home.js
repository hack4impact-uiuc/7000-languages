import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, StatusBar } from 'react-native'
import StyledButton from 'components/StyledButton'
import { colors } from 'theme'
import { getSampleHome } from 'api'
import { Box, Text } from 'native-base'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray.light,
  },
})

const Home = ({ navigation }) => {
  const [text, setText] = useState('Loading data...')

  useEffect(() => {
    const getData = async () => {
      const sampleHome = await getSampleHome()
      setText(sampleHome.result.text)
    }
    getData()
  }, [setText])

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Text
        fontWeight="regular"
        color="blue.dark"
        fontStyle="italic"
        fontSize="6xl"
      >
        Home
      </Text>
      <Text fontSize="6xl">{text}</Text>
      <StyledButton
        title="Primary Button"
        variant="primary"
        _text="color"
        onPress={() => {
          navigation.navigate('Details', { from: 'Home' })
        }}
      />

      <StyledButton
        title="Continue with Google"
        variant="secondary"
        onPress={() => {
          navigation.navigate('Details', { from: 'Home' })
        }}
      />

      <StyledButton
        title="Tertiary Button"
        variant="tertiary"
        onPress={() => {
          navigation.navigate('Details', { from: 'Home' })
        }}
      />

      <Box>ghghghgh</Box>
    </View>
  )
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Home.defaultProps = {
  navigation: { navigate: () => null },
}

export default Home
