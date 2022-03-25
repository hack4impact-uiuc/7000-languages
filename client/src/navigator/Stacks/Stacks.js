import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { colors } from 'theme'
import Home from 'pages/Home'
import Profile from 'pages/Profile'
import Landing from 'pages/Landing'
import Details from 'pages/Details'
import UnitDrawer from 'pages/UnitDrawer'
import ManageUnits from 'pages/ManageUnits'
import DrawerButton from './DrawerButton'
import BackButton from './BackButton'

// ------------------------------------
// Constants
// ------------------------------------

const Stack = createStackNavigator()
const AuthStack = createStackNavigator()
const ModalStack = createStackNavigator()

const navigationProps = {
  headerTintColor: 'white',
  headerStyle: { backgroundColor: colors.red.dark },
  headerTitleStyle: { fontSize: 18, fontFamily: 'GT_Haptik_bold' },
}

const modalNavigationProps = {
  headerShown: false,
}

const manageNavigationProps = {
  headerTintColor: 'black',
  headerStyle: { backgroundColor: colors.white.dark },
  headerTitleStyle: { color: colors.black, fontSize: 18, fontFamily: 'GT_Haptik_bold' },
}

// ------------------------------------
// Navigators
// ------------------------------------

/*

This contains the major navigators in the app. A navigator is a component
that takes route configuration as its children with additional props for configuration and renders our content.

We will need a navigator for each of the screens with an icon on the tab bar, along with a
navigator responsible for the login flow.

More reading: https://reactnavigation.org/docs/stack-navigator/

*/

export const AuthNavigator = () => (
  <AuthStack.Navigator
    initialRouteName="Landing"
    headerMode="screen"
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen
      name="Landing"
      component={Landing}
      options={() => ({
        title: 'Landing',
      })}
    />
  </AuthStack.Navigator>
)

export const ModalNavigator = () => (
  <ModalStack.Navigator
    initialRouteName="UnitDrawer"
    screenOptions={modalNavigationProps}
  >
    <ModalStack.Screen name="UnitDrawer" component={UnitDrawer} />
  </ModalStack.Navigator>
)

export const HomeNavigator = () => (
  <Stack.Navigator
    initialRouteName="ManageUnits"
    headerMode="screen"
    screenOptions={navigationProps}
  >
    {/* <Stack.Screen
      name="Home"
      component={Home}
      options={({ navigation }) => ({
        headerLeft: () => <DrawerButton navigation={navigation} />,
      })}
    /> */}
    <Stack.Screen
      name="ManageUnits"
      component={ManageUnits}
      options={({ navigation }) => ({
        ...manageNavigationProps,
        title: 'Manage Units',
        headerLeft: () => <BackButton navigation={navigation} />,
      })}
    />
    {/* <Stack.Screen
      name="Details"
      component={Details}
      options={({ navigation }) => ({
        title: 'Home',
        headerLeft: () => <DrawerButton navigation={navigation} />,
      })}
    /> */}
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
        headerLeft: () => <DrawerButton navigation={navigation} />,
      })}
    />
    <Stack.Screen
      name="Details"
      component={Details}
      options={({ navigation }) => ({
        title: 'Home',
        headerLeft: () => <DrawerButton navigation={navigation} />,
      })}
    />
  </Stack.Navigator>
)
