import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { colors } from 'theme'
import Home from 'pages/Home'
import Landing from 'pages/Landing'
import SelectLanguage from 'pages/SelectLanguage'
import VocabDrawer from 'pages/VocabDrawer'
import CreateLesson from 'pages/CreateLesson'
import CreateUnit from 'pages/CreateUnit'
import ManageUnits from 'pages/ManageUnits'
import Apply from 'pages/Apply'
import { NO_COURSE_ID } from 'utils/constants'
import PropTypes from 'prop-types'
import UnitHome from 'pages/UnitHome'
import LessonHome from 'pages/LessonHome'
import ManageLessons from 'pages/ManageLessons'
import BackButton from './BackButton'
import DrawerButton from './DrawerButton'

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
    initialRouteName="SelectLanguage"
    headerMode="screen"
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen
      name="SelectLanguage"
      component={SelectLanguage}
      options={() => ({
        title: 'SelectLanguage',
      })}
    />
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
  <ModalStack.Navigator screenOptions={modalNavigationProps}>
    <ModalStack.Screen name="CreateUnit" component={CreateUnit} />
    <ModalStack.Screen name="VocabDrawer" component={VocabDrawer} />
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
        cardStyle: { backgroundColor: 'white' },
      })}
    />
    <Stack.Screen
      name="UnitHome"
      component={UnitHome}
      options={({ navigation }) => ({
        title: '',
        headerLeft: () => <BackButton navigation={navigation} color="white" />,
        cardStyle: { backgroundColor: 'white' },
      })}
    />
    <Stack.Screen
      name="LessonHome"
      component={LessonHome}
      options={({ navigation }) => ({
        title: '',
        headerLeft: () => <BackButton navigation={navigation} color="white" />,
        cardStyle: { backgroundColor: 'white' },
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
        cardStyle: { backgroundColor: 'white' },
      })}
    />

    <Stack.Screen
      name="ManageUnits"
      component={ManageUnits}
      options={({ navigation }) => ({
        ...manageNavigationProps,
        title: 'Manage Units',
        headerLeft: () => <BackButton navigation={navigation} />,
        cardStyle: { backgroundColor: 'white' },
      })}
    />
    <Stack.Screen
      name="ManageLessons"
      component={ManageLessons}
      options={({ navigation }) => ({
        ...manageNavigationProps,
        title: 'Manage Lessons',
        headerLeft: () => <BackButton navigation={navigation} />,
        cardStyle: { backgroundColor: 'white' },
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
