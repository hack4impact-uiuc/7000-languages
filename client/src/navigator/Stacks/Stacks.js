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
import ManageVocab from 'pages/ManageVocab'
import UpdateLesson from 'pages/UpdateLesson'
import UpdateUnit from 'pages/UpdateUnit'
import CourseSettings from 'pages/CourseSettings'
import UpdateCourse from 'pages/UpdateCourse'
import Intro from 'pages/Intro'
import i18n from 'utils/i18n'
import BackButton from './BackButton'
import DrawerButton from './DrawerButton'

// ------------------------------------
// Constants
// ------------------------------------

const Stack = createStackNavigator()
const AuthStack = createStackNavigator()
const ModalStack = createStackNavigator()

const homeNavigationProps = {
  headerTintColor: 'white',
  headerStyle: { backgroundColor: colors.red.medium_dark },
  headerTitleStyle: { fontSize: 18, fontFamily: 'GT_Haptik_bold' },
}

const settingsNavigationProps = {
  headerTintColor: 'black',
  headerStyle: { backgroundColor: 'white' },
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
    initialRouteName="Intro"
    screenOptions={{
      headerShown: false,
      headerMode: 'screen',
      gestureEnabled: false,
    }}
  >
    <AuthStack.Screen name="Intro" component={Intro} />
    <AuthStack.Screen name="SelectLanguage" component={SelectLanguage} />
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
    <ModalStack.Screen name="UpdateUnit" component={UpdateUnit} />
    <ModalStack.Screen name="UpdateLesson" component={UpdateLesson} />
    <ModalStack.Screen name="UpdateCourse" component={UpdateCourse} />
  </ModalStack.Navigator>
)

export const HomeNavigator = ({ courseId }) => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      ...homeNavigationProps,
      headerMode: 'screen',
    }}
  >
    <Stack.Screen
      name={courseId}
      children={(props) => <Home {...props} courseId={courseId} />}
      options={({ navigation }) => ({
        title: i18n.t('dict.courseHome'),
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
        title: i18n.t('actions.becomeContributorTitle'),
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
      name="ManageVocab"
      component={ManageVocab}
      options={({ navigation }) => ({
        ...manageNavigationProps,
        title: i18n.t('actions.manageVocab'),
        headerLeft: () => <BackButton navigation={navigation} />,
        cardStyle: { backgroundColor: 'white' },
      })}
    />
    <Stack.Screen
      name="ManageUnits"
      component={ManageUnits}
      options={({ navigation }) => ({
        ...manageNavigationProps,
        title: i18n.t('actions.manageUnits'),
        headerLeft: () => <BackButton navigation={navigation} />,
        cardStyle: { backgroundColor: 'white' },
      })}
    />
    <Stack.Screen
      name="ManageLessons"
      component={ManageLessons}
      options={({ navigation }) => ({
        ...manageNavigationProps,
        title: i18n.t('actions.manageLessons'),
        headerLeft: () => <BackButton navigation={navigation} />,
        cardStyle: { backgroundColor: 'white' },
      })}
    />
    <Stack.Screen
      name="UpdateUnit"
      component={UpdateUnit}
      options={({ navigation }) => ({
        ...manageNavigationProps,
        headerLeft: () => <BackButton navigation={navigation} />,
        cardStyle: { backgroundColor: 'white' },
      })}
    />

    <Stack.Screen
      name="UpdateLesson"
      component={UpdateLesson}
      options={({ navigation }) => ({
        ...manageNavigationProps,
        headerLeft: () => <BackButton navigation={navigation} />,
        cardStyle: { backgroundColor: 'white' },
      })}
    />
  </Stack.Navigator>
)

export const SettingsNavigator = () => (
  <Stack.Navigator
    initialRouteName="CourseSettings"
    screenOptions={{
      ...settingsNavigationProps,
      headerMode: 'screen',
    }}
  >
    <Stack.Screen
      name="CourseSettings"
      component={CourseSettings}
      options={() => ({
        title: i18n.t('dict.settings'),
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
