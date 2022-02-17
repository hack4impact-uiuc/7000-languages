import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import Button from 'components/Button'
import { colors } from 'theme'
import { Text } from 'native-base'
import { useDispatch } from 'react-redux'
import { authenticate } from 'slices/auth.slice'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray.light,
  },
})

const Login = () => {
  const dispatch = useDispatch()

  const loginUser = () => {
    dispatch(authenticate({ loggedIn: true }))
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
        Login
      </Text>
      <Button
        title="Go to Login"
        color="white"
        backgroundColor={colors.orange.dark}
        onPress={loginUser}
      />
    </View>
  )
}

export default Login
