import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import TabNavigator from './Tabs'
import { LoginNavigator } from './Stacks'

const Navigator = () => {
  /*
    Here is an example of useSelector, a hook that allows you to extract data from the Redux store state.
    The selector will be run whenever the function component renders.
    useSelector() will also subscribe to the Redux store, and run your selector whenever an action is dispatched.
  */

  const { loggedIn } = useSelector((state) => state.auth)

  /*
    Based on whether the user is logged in or not, we will present the appropriate navigators.

    TODO: Load some authentication state from encrypted persistent storage (for example, SecureStore).
  */

  return loggedIn ? (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <LoginNavigator />
    </NavigationContainer>
  )
}

export default Navigator
