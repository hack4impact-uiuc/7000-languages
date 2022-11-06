import {
  CommonActions,
  DrawerActions,
  useLinkBuilder,
} from '@react-navigation/native'
import { DrawerItem } from '@react-navigation/drawer'
import React from 'react'
import PropTypes from 'prop-types'

/**
 * A custom component that renders the two navigation lists in the drawer, with a
 * child component in between. The purpose of this component is to create a navigation list of
 * Contributor Courses followed by a navigation list of Learner Courses, with a Header and Container
 * in between.
 *
 * Example: routes = ["abc", "123", "def"], firstRouteNames = ["abc"], secondRouteNames = ["123", "def"]
 *
 * Then the following will be returned:
 * <DrawerItem route={"abc"}/>
 * {middleChildComponent}
 * <DrawerItem route={"123"}/>
 * <DrawerItem route={"def"}/>
 *
 * @param state - React Navigation state, which contains the route data
 * @param navigation - React Navigation, which contains navigation info
 * @param descriptors - Contains styling information for the Drawer.Item
 * @param firstRouteNames - contains the names of the routes that must appear in the first navigation list
 * @param secondRouteNames - contains the names of the routes that must appear in the second navigation list
 * @param middleChildComponent - the child component that should be rendered in between two navigation lists
 *
 * Original component: https://github.com/react-navigation/react-navigation/blob/main/packages/drawer/src/views/DrawerItemList.tsx
 */
const SplitDrawerItemList = ({
  state,
  navigation,
  descriptors,
  firstRouteNames,
  secondRouteNames,
  middleChildComponent,
}) => {
  const buildLink = useLinkBuilder()

  const focusedRoute = state.routes[state.index]
  const focusedDescriptor = descriptors[focusedRoute.key]
  const focusedOptions = focusedDescriptor.options

  console.log(focusedOptions)

  /**
   * Creates a DrawerItem given route data
   * @param route = The route data
   * @param i - The index of the route in the React Navigator
   * @param zeroBasedShift - A shift to apply in the instance the route belongs to the second list
   * @returns
   */
  const createCustomDrawerItem = (route, i, zeroBasedShift = 0) => {
    const focused = i === state.index - zeroBasedShift

    const {
      activeBackgroundColor,
      activeTintColor,
      inactiveBackgroundColor,
      inactiveTintColor,
    } = focusedOptions

    const onPress = () => {
      const event = navigation.emit({
        type: 'drawerItemPress',
        target: route.key,
        canPreventDefault: true,
      })

      if (!event.defaultPrevented) {
        navigation.dispatch({
          ...(focused
            ? DrawerActions.closeDrawer()
            : CommonActions.navigate({ name: route.name, merge: true })),
          target: state.key,
        })
      }
    }

    const {
      title,
      drawerLabel,
      drawerIcon,
      drawerLabelStyle,
      drawerItemStyle,
      drawerAllowFontScaling,
    } = descriptors[route.key].options

    let label = drawerLabel

    if (drawerLabel === undefined) {
      label = title !== undefined ? title : route.name
    }

    return (
      <DrawerItem
        key={route.key}
        label={label}
        icon={drawerIcon}
        focused={focused}
        activeTintColor={activeTintColor}
        inactiveTintColor={inactiveTintColor}
        activeBackgroundColor={activeBackgroundColor}
        inactiveBackgroundColor={inactiveBackgroundColor}
        allowFontScaling={drawerAllowFontScaling}
        labelStyle={drawerLabelStyle}
        style={drawerItemStyle}
        to={buildLink(route.name, route.params)}
        onPress={onPress}
      />
    )
  }

  // Create the two Drawer.Item lists
  const firstRoutesList = state.routes
    .filter((obj) => firstRouteNames.includes(obj.name))
    .map((route, i) => createCustomDrawerItem(route, i, 0))
  const secondRoutesList = state.routes
    .filter((obj) => secondRouteNames.includes(obj.name))
    .map((route, i) => createCustomDrawerItem(route, i, firstRouteNames.length))

  return (
    <>
      {firstRoutesList}
      {middleChildComponent}
      {secondRoutesList}
    </>
  )
}

SplitDrawerItemList.propTypes = {
  state: PropTypes.shape({
    index: PropTypes.number,
    routes: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    key: PropTypes.string,
  }),
  navigation: PropTypes.shape({
    emit: PropTypes.func,
    dispatch: PropTypes.func,
  }),
  descriptors: PropTypes.arrayOf(PropTypes.string),
  firstRouteNames: PropTypes.arrayOf(PropTypes.string),
  secondRouteNames: PropTypes.arrayOf(PropTypes.string),
  middleChildComponent: PropTypes.elementType,
}

SplitDrawerItemList.defaultProps = {
  state: { index: 0, routes: [] },
  navigation: { emit: () => {}, dispatch: () => {} },
  descriptors: [],
  firstRouteNames: [],
  secondRouteNames: [],
  middleChildComponent: null,
}

export default SplitDrawerItemList
