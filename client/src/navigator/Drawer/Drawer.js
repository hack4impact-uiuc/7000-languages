/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer'
import { Text, Image } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import { colors, images } from 'theme'
import { View, Pressable, StyleSheet } from 'react-native'
import ContributorButton from 'components/ContributorButton'
import LearnerButton from 'components/LearnerButton'
import { useErrorWrap, useTrackPromise } from 'hooks'
import { getAllUserCourses } from 'utils/languageHelper'
import StyledButton from 'components/StyledButton'
import { setField } from 'slices/language.slice'
import { useDispatch, useSelector } from 'react-redux'
import NumberBox from 'components/NumberBox'
import i18n from 'utils/i18n'
import _ from 'lodash'
import DrawerMenu from './DrawerMenu'
import TabNavigator from '../Tabs'
import SplitDrawerItemList from './SplitDrawerItemList'

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
    marginVertical: 10,
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

const tabColors = [
  colors.red.light,
  colors.red.dark,
  colors.blue.light,
  colors.blue.dark,
]

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

const generateContributorTabs = (tabData) => tabData.map((element, index) => (
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
        </View>
      ),
      drawerIcon: () => (
        <View
          style={{
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FontAwesome
            name="square"
            size={45}
            icon="user"
            color={tabColors[0]}
          />
          <FontAwesome
            name="globe"
            size={25}
            icon="user"
            color={tabColors[1]}
            style={{ position: 'absolute' }}
          />
        </View>
      ),
    })}
  />
))

const generateLearnerTabs = (tabData) => tabData.map((element, index) => (
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
        </View>
      ),
      drawerIcon: () => (
        <View>
          <NumberBox number={index + 1} learner noMargin />
        </View>
      ),
    })}
  />
))

const DrawerMenuContainer = (props) => {
  const {
    state, firstRouteNames, secondRouteNames, ...rest
  } = props
  const newState = { ...state }

  const middleChildComponent = (
    <>
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
            {`${i18n.t('dialogue.learnIndigenousLanguage')} `}
            <Text fontFamily="heading" fontWeight="regular" fontStyle="normal">
              {i18n.t('actions.startLearning')}
            </Text>
          </Text>
          <StyledButton
            title={i18n.t('actions.searchCourses')}
            fontSize="sm"
            variant="learner_primary"
            onPress={() => props.navigation.navigate('Apply', { from: 'HomeBaseCase' })}
          />
        </Pressable>
      </View>

      <StyledButton
        title="CONTRIBUTOR"
        fontSize={15}
        variant="contributor"
        onPress={() => props.navigation.navigate('Apply', { from: 'HomeBaseCase' })}
      />
    </>
  )

  return (
    <>
      <DrawerContentScrollView {...props}>
        <DrawerMenu {...props} />

        <StyledButton
          title="LEARNER"
          fontSize={15}
          variant="learner"
          onPress={() => props.navigation.navigate('Apply', { from: 'HomeBaseCase' })}
        />

        <SplitDrawerItemList
          state={newState}
          firstRouteNames={firstRouteNames}
          secondRouteNames={secondRouteNames}
          middleChildComponent={middleChildComponent}
          {...rest}
        />

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
      </DrawerContentScrollView>
      <View style={drawerStyles.topDivider} />
      <StyledButton
        title={i18n.t('actions.accountInfo')}
        fontSize="sm"
        leftIcon={<FontAwesome name="user" size={20} color={colors.black} />}
        variant="account_info"
        onPress={() => props.navigation.navigate('Apply', { from: 'HomeBaseCase' })}
      />
    </>
  )
}

const DrawerNavigator = () => {
  const { allCourses } = useSelector((state) => state.language)
  const learnerCourses = allCourses.filter((element) => element.isContributor === false)
  const contributorCourses = allCourses.filter((element) => element.isContributor === true)
  const learnerIds = learnerCourses.map((course) => course._id)
  const contributorIds = contributorCourses.map((course) => course._id)

  const [userEmail, setEmail] = useState('')
  const [userName, setName] = useState(`${i18n.t('dialogue.loading')}`)
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
      screenOptions={{
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
          firstRouteNames={learnerIds}
          secondRouteNames={contributorIds}
          {...props}
        />
      )}
    >
      {(() => generateLearnerTabs(learnerCourses))()}
      {(() => generateContributorTabs(contributorCourses))()}
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
