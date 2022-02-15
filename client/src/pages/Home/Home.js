import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, StatusBar } from 'react-native'
import Button from 'components/Button'
import { colors } from 'theme'
import { getSampleHome } from 'api'
import { Box, Text } from 'native-base'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGray,
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
        bg="green.500"
        fontStyle="italic"
        fontSize="6xl"
      >
        Home
      </Text>
      <Text fontSize="6xl">{text}</Text>
      <Button
        title="Go to Details"
        color="white"
        backgroundColor={colors.gold}
        onPress={() => {
          navigation.navigate('Details', { from: 'Home' })
        }}
      />
      <Box>Hello world</Box>
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
