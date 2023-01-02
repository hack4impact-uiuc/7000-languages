import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { colors } from 'theme'
import { AntDesign } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
import i18n from 'utils/i18n'
import { HomeNavigator, SettingsNavigator } from '../Stacks'
import { NO_COURSE_ID } from '../../utils/constants'

const Tab = createBottomTabNavigator()

/*
  This file contains the a tab navigator, which is responsible for the tabs at the bottom of the app
  that allow us to switch between views. This tab navigator presents the home screen, profile screen, language screens,
  and anything else that an authenticated user would need access to.

  More reading: https://reactnavigation.org/docs/tab-based-navigation
*/

// Contains the names of all routes that should not show the tab bar described below
const tabHiddenRoutes = ['Apply']

const TabNavigator = (navigationData) => {
  const { currentCourseId, allCourses } = useSelector((state) => state.language)

  // Determine if we are showing a Learner Course. If so, we need to hide the Settings icon
  const courseIndex = allCourses.findIndex(
    (course) => course._id === currentCourseId,
  )

  /* navigationData.route.name is formatted as "<mongodb id>-learner" if the selected course is a Learner course
    and "<mongodb id>-contributor" if the select course is a Contributor course. We want to split this data by the
  '-' delimiter to get the mongodb id and learner/contributor text.
  */

  const isProperRoute = navigationData.route.name.split('-').length === 2

  const courseIdFromRoute = isProperRoute && navigationData.route.name.split('-')[0]
  const isLearnerCourse = courseIndex >= 0
    && isProperRoute
    && navigationData.route.name.split('-')[1] === 'learner'

  const shouldDisplayContributorSettings = currentCourseId !== '' && !isLearnerCourse

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.gray.dark,
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: [
          {
            display: tabHiddenRoutes.includes(
              getFocusedRouteNameFromRoute(route),
            )
              ? 'none'
              : 'flex',
          },
          null,
        ],
        // eslint-disable-next-line react/prop-types
        tabBarIcon: ({ focused }) => {
          switch (route.name) {
            case 'Units':
              return (
                <AntDesign
                  name="appstore1"
                  color={focused ? colors.gray.dark : colors.gray.dark}
                  size={20}
                  solid
                />
              )
            case 'Settings':
              return (
                <AntDesign
                  name="setting"
                  color={focused ? colors.gray.dark : colors.gray.dark}
                  size={25}
                  solid
                />
              )
            default:
              return <View />
          }
        },
      })}
      initialRouteName="Units"
      swipeEnabled={false}
    >
      <Tab.Screen
        name="Units"
        options={() => ({
          title: i18n.t('dict.courseHome'),
        })}
        children={(props) => (
          <HomeNavigator
            {...props}
            courseId={courseIdFromRoute}
            isContributor={!isLearnerCourse}
          />
        )}
      />
      <Tab.Screen
        name="Settings"
        options={() => ({
          title: i18n.t('dict.settings'),
        })}
        children={(props) => (
          <SettingsNavigator
            initialRouteName={
              shouldDisplayContributorSettings
                ? 'Settings'
                : 'LearnerCourseSettings'
            }
            {...props}
          />
        )}
      />
    </Tab.Navigator>
  )
}

TabNavigator.propTypes = {
  navigationData: PropTypes.shape({
    route: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
}

TabNavigator.defaultProps = {
  navigationData: { route: { name: NO_COURSE_ID } },
}

export default TabNavigator
