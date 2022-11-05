import {
    CommonActions,
    DrawerActions,
    useLinkBuilder,
} from '@react-navigation/native';
import {
    DrawerItem
} from '@react-navigation/drawer'
import React, { useState, useEffect } from 'react'

import { Text } from 'native-base';

/**
 * Component that renders the navigation list in the drawer.
 */
const CustomDrawerItemList = ({
    state,
    navigation,
    descriptors,
    nameA,
    nameB,
    middle
}) => {
    const buildLink = useLinkBuilder();

    const focusedRoute = state.routes[state.index];
    const focusedDescriptor = descriptors[focusedRoute.key];
    const focusedOptions = focusedDescriptor.options;

    const createComp = (route, i, iShift) => {
        const focused = i === state.index - iShift;

        const {
            drawerActiveTintColor,
            drawerInactiveTintColor,
            drawerActiveBackgroundColor,
            drawerInactiveBackgroundColor,
        } = focusedOptions;

        console.log(drawerActiveBackgroundColor);

        const onPress = () => {
            const event = navigation.emit({
                type: 'drawerItemPress',
                target: route.key,
                canPreventDefault: true,
            });

            if (!event.defaultPrevented) {
                navigation.dispatch({
                    ...(focused
                        ? DrawerActions.closeDrawer()
                        : CommonActions.navigate({ name: route.name, merge: true })),
                    target: state.key,
                });
            }
        };

        const {
            title,
            drawerLabel,
            drawerIcon,
            drawerLabelStyle,
            drawerItemStyle,
            drawerAllowFontScaling,
        } = descriptors[route.key].options;

        return (
            <DrawerItem
                key={route.key}
                label={
                    drawerLabel !== undefined
                        ? drawerLabel
                        : title !== undefined
                            ? title
                            : route.name
                }
                icon={drawerIcon}
                focused={focused}
                activeTintColor={'black'}
                inactiveTintColor={'black'}
                activeBackgroundColor={'#F9F9F9'}
                inactiveBackgroundColor={'white'}
                allowFontScaling={drawerAllowFontScaling}
                labelStyle={drawerLabelStyle}
                style={drawerItemStyle}
                to={buildLink(route.name, route.params)}
                onPress={onPress}
            />
        );
    }

    const a = state.routes.filter((obj) => nameA.includes(obj.name)).map((route, i) => createComp(route, i, 0));
    const b = state.routes.filter((obj) => nameB.includes(obj.name)).map((route, i) => createComp(route, i, nameA.length));

    return <>
        {a}
        {middle}
        {b}
    </>

}

export default CustomDrawerItemList;