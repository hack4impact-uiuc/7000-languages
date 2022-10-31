import React from 'react'
import { View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { colors } from 'theme'
import { AntDesign } from '@expo/vector-icons'
import PropTypes from 'prop-types'
import { HomeNavigator, SettingsNavigator } from '../Stacks'
import { NO_COURSE_ID } from '../../utils/constants'

const Tab = createBottomTabNavigator()

/*
  This file contains the a tab navigator, which is responsible for the tabs at the bottom of the app
  that allow us to switch between views. This tab navigator presents the home screen, profile screen, language screens,
  and anything else that an authenticated user would need access to.

  More reading: https://reactnavigation.org/docs/tab-based-navigation
*/

const TabNavigator = (navigationData) => (
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
          case 'Setting':
            return (
              <AntDesign
                name="setting"
                color={focused ? colors.red.dark : colors.gray.dark}
                size={25}
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
    }}
    initialRouteName="Units"
    swipeEnabled={false}
  >
    <Tab.Screen
      name="Units"
      children={(props) => (
        <HomeNavigator {...props} courseId={navigationData.route.name} />
      )}
    />
    <Tab.Screen
      name="Setting"
      children={(props) => (
        <SettingsNavigator />
      )}
    />
  </Tab.Navigator>
)

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
