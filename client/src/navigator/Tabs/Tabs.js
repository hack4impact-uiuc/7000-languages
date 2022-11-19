import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { colors } from 'theme'
import { AntDesign } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native'
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
  const { currentCourseId } = useSelector((state) => state.language)

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#DF4E47',
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
                  color={focused ? colors.red.medium_dark : colors.gray.dark}
                  size={20}
                  solid
                />
              )
            case 'Settings':
              return (
                <AntDesign
                  name="setting"
                  color={focused ? colors.red.medium_dark : colors.gray.dark}
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
        children={(props) => (
          <HomeNavigator {...props} courseId={navigationData.route.name} />
        )}
      />
      {currentCourseId !== '' ? (
        <Tab.Screen
          name="Settings"
          children={(props) => <SettingsNavigator {...props} />}
        />
      ) : null}
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
