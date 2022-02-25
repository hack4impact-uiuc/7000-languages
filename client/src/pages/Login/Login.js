import React, { useEffect } from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import Button from 'components/Button'
import { colors } from 'theme'
import { Text } from 'native-base'
import { useDispatch } from 'react-redux'
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

  /*
    Sources:
    https://docs.expo.dev/versions/latest/sdk/auth-session/
    https://stackoverflow.com/questions/66966772/expo-auth-session-providers-google-google-useauthrequest 
  */

  const [request, response, promptAsync] = Google.useAuthRequest({
    responseType: "id_token",
    expoClientId: Constants.manifest.extra.expoClientId,
    iosClientId: Constants.manifest.extra.iosClientId,
    androidClientId: Constants.manifest.extra.androidClientId,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { params, authentication } = response;
      // console.log(response);
      // console.log(params);
      // console.log(authentication);
    }
  }, [response]);

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
        onPress={promptAsync}
      />
    </View>
  )
}

export default Login
