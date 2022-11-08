/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import { Text, Image } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import { colors, images } from 'theme'
import { View, Pressable, StyleSheet } from 'react-native'
import OwnershipButton from 'components/OwnershipButton'
import DrawerLogoutButton from 'components/DrawerLogoutButton'
import { useErrorWrap, useTrackPromise } from 'hooks'
import { getAllUserCourses } from 'utils/languageHelper'
import StyledButton from 'components/StyledButton'
import { setField } from 'slices/language.slice'
import { useDispatch, useSelector } from 'react-redux'
import i18n from 'utils/i18n'
import DrawerMenu from './DrawerMenu'
import TabNavigator from '../Tabs'

const tabStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    flex: 3,
  },
  units: {
    fontSize: 20,
    color: '#A4A4A4',
  },
})

const drawerStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: '#F9F9F9',
  },
  topDivider: {
    marginTop: '10%',
    marginBottom: '5%',
    height: 1,
    backgroundColor: '#EFEFEF',
    width: '90%',
  },
  bottomDivider: {
    marginTop: '3%',
    height: 1,
    backgroundColor: '#EFEFEF',
    width: '90%',
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 10,
  },
  userInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 20,
    justifyContent: 'flex-end',
  },
  userName: {
    paddingLeft: 10,
    fontSize: 20,
  },
  userEmail: {
    fontSize: 15,
    paddingLeft: 10,
  },
})

const Drawer = createDrawerNavigator()

const tabColors = [colors.red.dark]

const generateUnitLabel = (numUnits) => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(numUnits)) {
    return numUnits
  }
  if (parseInt(numUnits, 10) === 1) {
    return `${i18n.t('dict.unitSingle')}`
  }
  return `${numUnits} ${i18n.t('dict.unitPlural')}`
}

/**
 * Generates the course tabs for the Drawer Tab Bar
 * @param {Array} data Array of Course Data to use for each tab bar
 * @returns
 */
const generateTabs = (tabData) => tabData.map((element, index) => (
  <Drawer.Screen
    key={element._id}
    name={element._id}
    component={TabNavigator}
    options={() => ({
      drawerLabel: () => (
        <View style={tabStyles.container}>
          <View>
            <Text
              style={tabStyles.title}
              fontFamily="heading"
              fontWeight="regular"
              fontStyle="normal"
            >
              {element.name}
            </Text>
            <Text style={tabStyles.units}>
              {generateUnitLabel(element.num_units)}
            </Text>
          </View>
          {element.isContributor ? <OwnershipButton isContributor /> : null}
        </View>
      ),
      drawerIcon: () => (
        <FontAwesome
          name="square"
          size={45}
          color={tabColors[index % tabColors.length]}
        />
      ),
    })}
  />
))

const DrawerMenuContainer = (props) => {
  const { state, ...rest } = props
  const newState = { ...state }
  const drawerApply = true

  return (
    <>
      <DrawerContentScrollView {...props}>
        <DrawerMenu {...props} />
        <DrawerItemList state={newState} {...rest} />

        {drawerApply ? (
          <View style={drawerStyles.container}>
            <Pressable
              style={drawerStyles.pressable}
              forceInset={{
                top: 'always',
                horizontal: 'never',
              }}
            >
              <Text
                fontWeight="regular"
                color="gray.dark"
                fontSize="sm"
                textAlign="left"
              >
                {`${i18n.t('dialogue.indigenousLanguagePrompt')} `}
                <Text
                  fontFamily="heading"
                  fontWeight="regular"
                  fontStyle="normal"
                >
                  {i18n.t('actions.becomeContributor')}
                </Text>
              </Text>
              <StyledButton
                title={i18n.t('actions.applyNow')}
                fontSize="sm"
                onPress={() => props.navigation.navigate('Apply', { from: 'HomeBaseCase' })}
              />
            </Pressable>
          </View>
        ) : null}
      </DrawerContentScrollView>
      <View style={drawerStyles.topDivider} />
      <View style={drawerStyles.bottomContainer}>
        <Image
          source={
            props.profileUrl === ''
              ? images.default_icon
              : { uri: props.profileUrl }
          }
          alt="Profile Icon"
          size="sm"
          resizeMode="contain"
          borderRadius={100}
        />
        <View style={drawerStyles.userInfoContainer}>
          <Text
            style={drawerStyles.userName}
            fontFamily="heading"
            fontWeight="regular"
            fontStyle="normal"
          >
            {props.name}
          </Text>
          <Text style={drawerStyles.userEmail}>{props.email}</Text>
        </View>
      </View>
      <View style={drawerStyles.bottomDivider} />
      <DrawerLogoutButton />
    </>
  )
}

const DrawerNavigator = () => {
  const { allCourses } = useSelector((state) => state.language)

  const [userEmail, setEmail] = useState('')
  const [userName, setName] = useState('')
  const [profileUrl, setProfileUrl] = useState('')
  const errorWrap = useErrorWrap()
  const trackPromise = useTrackPromise()

  const dispatch = useDispatch()

  useEffect(() => {
    const getUserData = async () => {
      await errorWrap(async () => {
        const {
          picture, name, email, courses,
        } = await trackPromise(
          getAllUserCourses(),
        )

        // Set personal info
        setProfileUrl(picture)
        setName(name)
        setEmail(email)

        if (courses.length > 0) {
          dispatch(setField({ key: 'allCourses', value: courses }))
        }
      })
    }
    getUserData()
  }, [])

  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'black',
        activeBackgroundColor: '#F9F9F9',
        inactiveBackgroundColor: 'white',
        itemStyle: { marginVertical: 4 },
      }}
      drawerStyle={{
        width: 350,
      }}
      initialRouteName="Units"
      drawerContent={(props) => (
        <DrawerMenuContainer
          email={userEmail}
          name={userName}
          profileUrl={profileUrl}
          {...props}
        />
      )}
    >
      {(() => generateTabs(allCourses))()}
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
