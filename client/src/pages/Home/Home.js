import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, Text, View, StatusBar,
} from 'react-native'
import Button from 'components/Button'
import { colors } from 'theme'
import { getSampleHome } from 'api'
import { Box } from "native-base";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGray,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: 'GT_Haptik_oblique',
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
      <Text style={styles.title}>Home</Text>
      <Text>{text}</Text>
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
