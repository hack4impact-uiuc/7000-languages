import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { authenticate } from 'slices/auth.slice'
import { createStackNavigator } from '@react-navigation/stack'
import { getUser } from 'api'
import { loadUserIDToken } from 'utils/auth'
import DrawerNavigator from './Drawer'
import { AppSettingsNavigator, AuthNavigator, ModalNavigator, SearchNavigator, ActivityNavigator } from './Stacks'

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
      if (idToken != null) {
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
      }}
    >
      {loggedIn ? (
        <>
          <RootStack.Group screenOptions={{ presentation: 'modal' }}>
            <RootStack.Screen name="Drawer" component={DrawerNavigator} />
            <RootStack.Screen name="Modal" component={ModalNavigator} />
          </RootStack.Group>
          <RootStack.Screen name="AppSettings" component={AppSettingsNavigator} />
          <RootStack.Screen name="Activity" component={ActivityNavigator} />
          <RootStack.Screen name="Search" component={SearchNavigator} />
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
