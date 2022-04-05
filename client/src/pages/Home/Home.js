import React from 'react'
import PropTypes from 'prop-types'
<<<<<<< HEAD
import { StyleSheet, View, StatusBar } from 'react-native'
import StyledButton from 'components/StyledButton'
import { colors } from 'theme'
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
  const dispatch = useDispatch()

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
      <Text fontSize="6xl">Wassup</Text>
      <StyledButton
        variant="primary"
        onPress={() => {
          navigation.navigate('Apply', { from: 'Home' })
        }}
        //<StyledButton
        title="Go to Ishaan's page"
        variant="primary"
      />

      <StyledButton
        title="Unit Drawer"
        variant="primary"
        onPress={() => {
          navigation.navigate('Modal', { screen: 'UnitDrawer' })
        }}
      />
      <StyledButton title="Logout" type="secondary" onPress={logoutUser} />
    </View>
  )
}
=======
import HomeBaseCase from '../../components/HomeBaseCase/HomeBaseCase'
>>>>>>> dev

const Home = ({ navigation }) => <HomeBaseCase navigation={navigation} />
Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Home.defaultProps = {
  navigation: { navigate: () => null },
}
export default Home
