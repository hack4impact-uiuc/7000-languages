import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { authenticate } from 'slices/auth.slice'
import { createStackNavigator } from '@react-navigation/stack'
import { getUser } from 'api'
import DrawerNavigator from './Drawer'
import { AuthNavigator, ModalNavigator } from './Stacks'
import { loadUserIDToken } from '../utils/auth'

const RootStack = createStackNavigator()
const Navigator = () => {
  /*
    Here is an example of useSelector, a hook that allows you to extract data from the Redux store state.
    The selector will be run whenever the function component renders.
    useSelector() will also subscribe to the Redux store, and run your selector whenever an action is dispatched.
  */
  const dispatch = useDispatch()

  useEffect(() => {
    const loadUserAuth = async () => {
      const idToken = await loadUserIDToken()
      if (!idToken) {
        dispatch(authenticate({ loggedIn: false }))
      }
      getUser()
        .then(() => {
          dispatch(authenticate({ loggedIn: true }))
        })
        .catch(() => {
          dispatch(authenticate({ loggedIn: false }))
        })
    }

    loadUserAuth()
  }, [])

  const { loggedIn } = useSelector((state) => state.auth)

  /*
    Based on whether the user is logged in or not, we will present the appropriate navigators.
  */

  return (
    <RootStack.Navigator
      screenOptions={{
        animationEnabled: true,
        gestureEnabled: true,
        headerShown: false,
        presentation: 'modal',
      }}
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
