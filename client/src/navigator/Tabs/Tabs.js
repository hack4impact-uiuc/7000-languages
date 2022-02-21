import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { colors } from 'theme'
import { HomeNavigator, ProfileNavigator } from '../Stacks'

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
          case 'Home':
            return (
              <FontIcon
                name="home"
                color={focused ? colors.red.dark : colors.gray.dark}
                size={20}
                solid
              />
            )
          case 'Profile':
            return (
              <FontIcon
                name="user"
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
    <Tab.Screen name="Home" component={HomeNavigator} />
    <Tab.Screen name="Profile" component={ProfileNavigator} />
  </Tab.Navigator>
)

export default TabNavigator
