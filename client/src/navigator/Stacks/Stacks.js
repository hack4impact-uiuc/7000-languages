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
import LearnerSearch from 'pages/LearnerSearch'
import LearnerUnitHome from 'pages/LearnerUnitHome'
import LearnerLessonHome from 'pages/LearnerLessonHome'
import StartActivity from 'pages/StartActivity'
import Activity1 from 'pages/Activity1'
import Activity2 from 'pages/Activity2'
import AppLanguage from 'pages/AppLanguage'
import AccountInfo from 'pages/AccountInfo'
import Congrats from 'pages/Congrats'
import LearnerCourseSettings from 'pages/LearnerCourseSettings'
import BackButton from './BackButton'
import DrawerButton from './DrawerButton'

// ------------------------------------
// Constants
// ------------------------------------

const Stack = createStackNavigator()
const AuthStack = createStackNavigator()
const ModalStack = createStackNavigator()
const SearchStack = createStackNavigator()
const ActivityStack = createStackNavigator()
const SettingsStack = createStackNavigator()

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

const learnerNavigationProps = {
  headerTintColor: 'white',
  headerStyle: { backgroundColor: colors.blue.dark },
  headerTitleStyle: { fontSize: 18, fontFamily: 'GT_Haptik_bold' },
  headerShown: true,
}

const modalNavigationProps = {
  headerShown: false,
}

const activityNavigationProps = {
  headerTintColor: 'white',
  headerStyle: { backgroundColor: colors.blue.medium },
  headerTitleStyle: { fontSize: 18, fontFamily: 'GT_Haptik_bold' },
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

export const ActivityNavigator = () => (
  <ActivityStack.Navigator screenOptions={activityNavigationProps}>
    <ActivityStack.Screen
      name="StartActivity"
      component={StartActivity}
      options={({ navigation }) => ({
        title: i18n.t('dict.activity'),
        headerLeft: () => <BackButton navigation={navigation} color="white" />,
        cardStyle: { backgroundColor: colors.blue.light },
      })}
    />
    <ActivityStack.Screen
      name="Activity1"
      component={Activity1}
      options={({ navigation }) => ({
        title: `${i18n.t('dict.activity')} 1`,
        headerLeft: () => <BackButton navigation={navigation} color="white" />,
        cardStyle: { backgroundColor: 'white' },
      })}
    />
    <ActivityStack.Screen
      name="Activity2"
      component={Activity2}
      options={({ navigation }) => ({
        title: `${i18n.t('dict.activity')} 2`,
        headerLeft: () => <BackButton navigation={navigation} color="white" />,
        cardStyle: { backgroundColor: 'white' },
      })}
    />
    <ActivityStack.Screen
      name="Congrats"
      component={Congrats}
      options={() => ({
        title: `${i18n.t('dict.congratulations')}`,
        headerLeft: () => null,
        cardStyle: { backgroundColor: 'white' },
      })}
    />
  </ActivityStack.Navigator>
)

export const AppSettingsNavigator = () => (
  <SettingsStack.Navigator screenOptions={settingsNavigationProps}>
    <SettingsStack.Screen
      name="AccountInfo"
      component={AccountInfo}
      options={({ navigation }) => ({
        title: i18n.t('actions.accountInfo'),
        headerLeft: () => <BackButton navigation={navigation} color="black" />,
        cardStyle: { backgroundColor: 'white' },
      })}
    />
    <SettingsStack.Screen
      name="AppLanguage"
      component={AppLanguage}
      options={({ navigation }) => ({
        title: `${i18n.t('dict.language')}`,
        headerLeft: () => <BackButton navigation={navigation} color="black" />,
        cardStyle: { backgroundColor: 'white' },
      })}
    />
  </SettingsStack.Navigator>
)

export const HomeNavigator = ({ courseId, isContributor }) => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      ...homeNavigationProps,
      headerMode: 'screen',
    }}
  >
    <Stack.Screen
      name={courseId}
      children={(props) => (
        <Home {...props} courseId={courseId} isContributor={isContributor} />
      )}
      options={({ navigation }) => ({
        title: i18n.t('dict.courseHome'),
        headerLeft: () => <DrawerButton navigation={navigation} />,
        cardStyle: { backgroundColor: 'white' },
      })}
    />
    <Stack.Screen
      name="LearnerUnitHome"
      component={LearnerUnitHome}
      options={({ navigation }) => ({
        title: '',
        headerLeft: () => <BackButton navigation={navigation} color="white" />,
        cardStyle: { backgroundColor: 'white' },
        headerStyle: { backgroundColor: colors.blue.medium },
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
      name="LearnerLessonHome"
      component={LearnerLessonHome}
      options={({ navigation }) => ({
        title: '',
        headerLeft: () => <BackButton navigation={navigation} color="white" />,
        cardStyle: { backgroundColor: 'white' },
        headerStyle: { backgroundColor: colors.blue.medium },
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

export const SearchNavigator = () => (
  <SearchStack.Navigator
    initialRouteName="Search"
    screenOptions={{
      ...learnerNavigationProps,
      headerMode: 'screen',
    }}
  >
    <SearchStack.Screen
      name="LearnerSearch"
      component={LearnerSearch}
      options={({ navigation }) => ({
        ...learnerNavigationProps,
        title: i18n.t('actions.search'),
        headerLeft: () => (
          <BackButton navigation={navigation} color={colors.white.dark} />
        ),
        cardStyle: { backgroundColor: 'white' },
      })}
    />
  </SearchStack.Navigator>
)

export const SettingsNavigator = ({ initialRouteName }) => (
  <Stack.Navigator
    initialRouteName={initialRouteName}
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
    <Stack.Screen
      name="LearnerCourseSettings"
      component={LearnerCourseSettings}
      options={() => ({
        title: i18n.t('dict.settings'),
        cardStyle: { backgroundColor: 'white' },
      })}
    />
  </Stack.Navigator>
)

SettingsNavigator.propTypes = {
  initialRouteName: PropTypes.string,
}

SettingsNavigator.defaultProps = {
  initialRouteName: 'Settings',
}

HomeNavigator.propTypes = {
  courseId: PropTypes.string,
  isContributor: PropTypes.bool,
}

HomeNavigator.defaultProps = {
  courseId: NO_COURSE_ID,
  isContributor: false,
}
