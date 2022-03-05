import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, StatusBar } from 'react-native'
import StyledButton from 'components/StyledButton'
import { colors } from 'theme'
import { getSampleHome } from 'api'
import { Text } from 'native-base'
import { authenticate, removeToken } from 'slices/auth.slice'
import { useDispatch } from 'react-redux'
import { removeUserIDToken } from '../../utils/auth'

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

  const dispatch = useDispatch()

  useEffect(() => {
    const getData = async () => {
      const sampleHome = await getSampleHome()
      setText(sampleHome.result)
    }
    getData()
  }, [setText])

  const getAPIData = async () => {
    const sampleHome = await getSampleHome()
    setText(sampleHome.result)
  }

  const logoutUser = async () => {
    await removeUserIDToken()
    dispatch(removeToken())
    dispatch(authenticate({ loggedIn: false }))
  }

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
        onPress={() => {
          navigation.navigate('Details', { from: 'Home' })
        }}
      />
      <StyledButton title="Logout" type="secondary" onPress={logoutUser} />
      <StyledButton title="Get Data" type="tertiary" onPress={getAPIData} />
    </View >
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
