import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { authenticate } from 'slices/auth.slice'
import { loadUserIDToken, loadUserRefreshToken } from 'utils/auth'
import { createStackNavigator } from '@react-navigation/stack'
import DrawerNavigator from './Drawer'
import { AuthNavigator, ModalNavigator } from './Stacks'

const RootStack = createStackNavigator()
const Navigator = () => {
  /*
    Here is an example of useSelector, a hook that allows you to extract data from the Redux store state.
    The selector will be run whenever the function component renders.
    useSelector() will also subscribe to the Redux store, and run your selector whenever an action is dispatched.
  */
  const dispatch = useDispatch()

  useEffect(() => {
    const loadAuthFromPersistentStorage = async () => {
      const idToken = await loadUserIDToken()
      const refreshToken = await loadUserRefreshToken();
      if (idToken != null) {
        dispatch(authenticate({ loggedIn: true, idToken, refreshToken }))
      } else {
        dispatch(authenticate({ loggedIn: false }))
      }
    }

    loadAuthFromPersistentStorage()
  }, [])

  const { loggedIn } = useSelector((state) => state.auth)

  /*
    Based on whether the user is logged in or not, we will present the appropriate navigators.
  */

  return (
    <RootStack.Navigator
      headerMode="none"
      screenOptions={{ animationEnabled: true, gestureEnabled: true }}
      mode="modal"
    >
      {loggedIn ? (
        <>
          <RootStack.Screen name="Drawer" component={DrawerNavigator} />
          <RootStack.Screen name="Modal" component={ModalNavigator} />
        </>
      ) : (
        <RootStack.Screen name="Auth" component={AuthNavigator} />
      )}
    </RootStack.Navigator>
  )
}

export default () => (
  <NavigationContainer>
    <Navigator />
  </NavigationContainer>
)
