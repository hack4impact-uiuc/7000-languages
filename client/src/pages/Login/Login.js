import React, { useEffect } from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import Button from 'components/Button'
import { colors } from 'theme'
import { Text } from 'native-base'
import { useDispatch } from 'react-redux'
import { authenticate } from 'slices/auth.slice'
import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants'
import * as WebBrowser from 'expo-web-browser';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray.light,
  },
})

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const dispatch = useDispatch()

  alert("new test")

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: Constants.manifest.extra.expoClientId,
    iosClientId: Constants.manifest.extra.iosClientId,
    androidClientId: Constants.manifest.extra.androidClientId,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log(authentication);
      alert("signed in")
    }
  }, [response]);

  // const signInAsync = async () => {

  //   try {


  //     alert("success")
  //     console.log(response);

  //     if (type === "success") {
  //       console.log(user)
  //       // Then you can use the Google REST API
  //       console.log("LoginScreen.js 17 | success, navigating to profile");
  //     }
  //   } catch (error) {
  //     alert(error)
  //     console.log("LoginScreen.js 19 | error with login", error);
  //   }
  // };

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
        disabled={!request}
        color="white"
        backgroundColor={colors.orange.dark}
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  )
}

export default Login
