import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { authenticate, saveToken } from 'slices/auth.slice'
import { loadUserToken } from '../utils/auth'
import DrawerNavigator from './Drawer'
import { AuthNavigator } from './Stacks'

const Navigator = () => {
  /*
    Here is an example of useSelector, a hook that allows you to extract data from the Redux store state.
    The selector will be run whenever the function component renders.
    useSelector() will also subscribe to the Redux store, and run your selector whenever an action is dispatched.
  */
  const dispatch = useDispatch()

  useEffect(() => {
    const loadAuthFromPersistentStorage = async () => {
      const userToken = await loadUserToken()
      if (userToken != null) {
        dispatch(saveToken(userToken))
        dispatch(authenticate(true))
      } else {
        dispatch(authenticate(false))
      }
    }

    loadAuthFromPersistentStorage()
  }, [])

  const { loggedIn } = useSelector((state) => state.auth)

  /*
    Based on whether the user is logged in or not, we will present the appropriate navigators.
  */
  return loggedIn ? (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  )
}

export default Navigator
