import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { colors } from 'theme'
import Home from 'pages/Home'
import Landing from 'pages/Landing'
import CreateLesson from 'pages/CreateLesson'
import CreateUnit from 'pages/CreateUnit'
import ManageUnits from 'pages/ManageUnits'
import Apply from 'pages/Apply'
import { NO_COURSE_ID } from 'utils/constants'
import PropTypes from 'prop-types'
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
  headerTitleStyle: {
    color: colors.black,
    fontSize: 18,
    fontFamily: 'GT_Haptik_bold',
  },
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
    initialRouteName="CreateUnit"
    screenOptions={modalNavigationProps}
  >
    <ModalStack.Screen name="CreateUnit" component={CreateUnit} />
    <ModalStack.Screen name="CreateLesson" component={CreateLesson} />
  </ModalStack.Navigator>

)

export const HomeNavigator = ({ courseId }) => (
  <Stack.Navigator
    initialRouteName="Home"
    headerMode="screen"
    screenOptions={navigationProps}
  >
    <Stack.Screen
      name={courseId}
      children={(props) => <Home {...props} courseId={courseId} />}
      options={({ navigation }) => ({
        title: 'Home',
        headerLeft: () => <DrawerButton navigation={navigation} />,
      })}
    />

    <Stack.Screen
      name="Apply"
      component={Apply}
      options={({ navigation }) => ({
        title: 'Become a Contributor',
        headerStyle: { backgroundColor: colors.white.light },
        headerTitleStyle: {
          fontSize: 18,
          fontFamily: 'GT_Haptik_bold',
          color: 'black',
        },
        headerLeft: () => <BackButton navigation={navigation} />,
      })}
    />
    <Stack.Screen
      name="ManageUnits"
      component={ManageUnits}
      options={({ navigation }) => ({
        ...manageNavigationProps,
        title: 'Manage Units',
        headerLeft: () => <BackButton navigation={navigation} />,
      })}
    />
  </Stack.Navigator>
)

HomeNavigator.propTypes = {
  courseId: PropTypes.string,
}

HomeNavigator.defaultProps = {
  courseId: NO_COURSE_ID,
}
