import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { colors } from 'theme'
import Home from 'pages/Home'
import Profile from 'pages/Profile'
import Landing from 'pages/Landing'
import Details from 'pages/Details'
import Apply from 'pages/Apply'
import HeaderTitle from './HeaderTitle'
import HeaderLeft from './HeaderLeft'

// ------------------------------------
// Constants
// ------------------------------------

const Stack = createStackNavigator()

const navigationProps = {
  headerTintColor: 'white',
  headerStyle: { backgroundColor: colors.red.dark },
  headerTitleStyle: { fontSize: 18 },
}

// ------------------------------------
// Navigators
// ------------------------------------

/*

This contains the major navigators in the app. A naviagtor is a component
that takes route configuration as its children with additional props for configuration and renders our content.

We will need a navigator for each of the screens with an icon on the tab bar, along with a
navigator responsible for the login flow.

More reading: https://reactnavigation.org/docs/stack-navigator/

*/

export const AuthNavigator = () => (
  <Stack.Navigator
    initialRouteName="Landing"
    headerMode="screen"
    screenOptions={navigationProps}
  >
    <Stack.Screen
      name="Landing"
      component={Landing}
      options={() => ({
        title: 'Landing',
      })}
    />
  </Stack.Navigator>
)

export const HomeNavigator = () => (
  <Stack.Navigator
    initialRouteName="Units"
    headerMode="screen"
    screenOptions={navigationProps}
  >
    <Stack.Screen
      name="Units"
      component={Home}
      options={({ navigation }) => ({
        title: 'Units',
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
      })}
    />
    <Stack.Screen
      name="Details"
      component={Details}
      options={({ navigation }) => ({
        title: 'Home',
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
      })}
    />
  </Stack.Navigator>
)

export const ProfileNavigator = () => (
  <Stack.Navigator
    initialRouteName="Profile"
    headerMode="screen"
    screenOptions={navigationProps}
  >
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={({ navigation }) => ({
        title: 'Profile',
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
      })}
    />
    <Stack.Screen
      name="Details"
      component={Details}
      options={({ navigation }) => ({
        title: 'Home',
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
      })}
    />
  </Stack.Navigator>
)

export const ApplyNavigator = () => (
  <Stack.Navigator
    initialRouteName="Apply"
    headerMode="screen"
    screenOptions={navigationProps}
  >
    <Stack.Screen
      name="Apply"
      component={Apply}
      options={({ navigation }) => ({
        title: 'Apply to Contribute',
        headerLeft: () => <HeaderLeft navigation={navigation} />,
        headerTitle: () => <HeaderTitle />,
      })}
    />
  </Stack.Navigator>
)

