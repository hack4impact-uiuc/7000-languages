import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { colors } from 'theme'
import { HomeNavigator } from '../Stacks'
import { AntDesign } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

/*
  This file contains the a tab navigator, which is responsible for the tabs at the bottom of the app
  that allow us to switch between views. This tab navigator presents the home screen, profile screen, language screens,
  and anything else that an authenticated user would need access to.

  More reading: https://reactnavigation.org/docs/tab-based-navigation
*/

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      // eslint-disable-next-line react/prop-types
      tabBarIcon: ({ focused }) => {
        switch (route.name) {
          case 'Units':
            return (
              <AntDesign
                name="appstore1"
                color={focused ? colors.red.dark : colors.gray.dark}
                size={20}
                solid
              />
            )

          default:
            return <View />
        }
      },
    })}
    tabBarOptions={{
      activeTintColor: colors.red.dark,
      inactiveTintColor: colors.gray.dark,
      style: {
        // backgroundColor: 'white',
        // borderTopColor: 'gray',
        // borderTopWidth: 1,
        // paddingBottom: 5,
        // paddingTop: 5,
      },
    }}
    initialRouteName="Home"
    swipeEnabled={false}
  >
    <Tab.Screen name="Units" component={HomeNavigator} />
  </Tab.Navigator>
)

export default TabNavigator
