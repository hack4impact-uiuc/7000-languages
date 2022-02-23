import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import Button from 'components/Button'
import { colors } from 'theme'
import { Text } from 'native-base'
import { useDispatch } from 'react-redux'
import { authenticate } from 'slices/auth.slice'
import * as Google from "expo-google-app-auth";

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

  console.log("in login");

  const signInAsync = async () => {
    console.log("LoginScreen.js 6 | loggin in");
    try {
      const { type, user } = await Google.logInAsync({
        iosClientId: `558041423211-hc41ckr5muh3l09rsqqrs4nkaspltrba.apps.googleusercontent.com`,
        androidClientId: `558041423211-4g0ka2fsrdr0295kc041pq8e6be9496g.apps.googleusercontent.com`,
      });

      console.log(user);

      if (type === "success") {
        console.log(user)
        // Then you can use the Google REST API
        console.log("LoginScreen.js 17 | success, navigating to profile");
      }
    } catch (error) {
      console.log("LoginScreen.js 19 | error with login", error);
    }
  };

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
        title="Login to app"
        color="white"
        backgroundColor={colors.orange.dark}
        onPress={signInAsync}
      />
    </View>
  )
}

export default Login
