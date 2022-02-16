import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Text } from 'native-base'
import { useSelector, useDispatch } from 'react-redux'
import { authenticate } from 'slices/app.slice'

import TabNavigator from './Tabs'

const Navigator = () => {
  /*
    Here is an example of useSelector, a hook that allows you to extract data from the Redux store state.
    The selector will be run whenever the function component renders.
    useSelector() will also subscribe to the Redux store, and run your selector whenever an action is dispatched.
  */

  const { checked, loggedIn } = useSelector((state) => state.app)
  const dispatch = useDispatch()

  useEffect(() => {
    // Here is an example of a dispatch, which
    // dispatches actions and trigger state changes to the store.
    dispatch(authenticate({ loggedIn: true, checked: true }))
  }, [])

  return checked ? (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  ) : (
    <Text>Loading...</Text>
  )
}

export default Navigator
