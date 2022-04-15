import React from 'react'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import { Text } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import { colors } from 'theme'
import { View, Pressable } from 'react-native'
import StyledButton from 'components/StyledButton'
import OwnershipButton from 'components/OwnershipButton'
import TabNavigator from '../Tabs'
import DrawerMenu from './DrawerMenu'
import DrawerLogoutButton from '../../components/DrawerLogoutButon'

const Drawer = createDrawerNavigator()

/**
 * Data used for rendering the Drawer Tab
 */

const data = [
  {
    _id: 'abcdef',
    title: 'Spanish',
    units: '14 Units',
    isContributor: false,
  },
  {
    _id: 'aenasdas',
    title: 'French',
    units: '10 Units',
    isContributor: true,
  },
  {
    _id: 'asdnemsa',
    title: 'Chinese',
    units: '8 Units',
    isContributor: false,
  },
  {
    _id: 'mehjasjd',
    title: 'German',
    units: '8 Units',
    isContributor: true,
  },
]

const tabColors = [
  colors.red.dark,
  colors.blue.dark,
  colors.orange.dark,
  colors.green.dark,
]

/**
 * Generates the course tabs for the Drawer Tab Bar
 * @param {Array} data Array of Course Data to use for each tab bar
 * @returns
 */
const generateTabs = (tabData) => tabData.map((element, index) => (
  <Drawer.Screen
    key={element._id}
    name={element.title}
    component={TabNavigator}
    options={() => ({
      drawerLabel: () => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{ fontFamily: 'GT_Haptik_bold', fontSize: 20, flex: 3 }}
            >
              {element.title}
            </Text>
            <Text
              style={{
                fontFamily: 'GT_Haptik_regular',
                fontSize: 20,
                color: '#A4A4A4',
              }}
            >
              {element.units}
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
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginTop: 10,
            }}
          >
            <Pressable
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 12,
                paddingHorizontal: 10,
                borderRadius: 10,
                marginHorizontal: 10,
                backgroundColor: '#F9F9F9',
              }}
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
                Do you know an indigenous language that you would like to share
                with the world?
                <Text
                  style={{
                    fontFamily: 'GT_Haptik_bold',
                  }}
                >
                  {' '}
                  Become a contributor.
                </Text>
              </Text>
              <StyledButton title="Apply Now" fontSize="sm" />
            </Pressable>
          </View>
        ) : null}
      </DrawerContentScrollView>
      <View
        style={{
          marginTop: '10%',
          marginBottom: '5%',
          height: 1,
          backgroundColor: '#EFEFEF',
          width: '90%',
        }}
      />

      {/* Full View of Profile */}
      <View>
        {/* Photo from Google Auth goes here */}
        {/* <Image
        style={{
          width: 50,
          height: 50,
        }}
                source={require({picture})}
              /> */}
        {/* TEXT Profile View */} 
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginRight: 20,
          }}
        >
          <Text
            style={{
              paddingLeft: 10,
              fontFamily: 'GT_Haptik_bold',
              fontSize: 20,
            }}
          >
            Michael Scott
          </Text>
          <Text
            style={{
              fontSize: 15,
              paddingLeft: 10,
            }}
          >
            michaelscott@gmail.com
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: '3%',
          height: 1,
          backgroundColor: '#EFEFEF',
          width: '90%',
        }}
      />
      <DrawerLogoutButton />
    </>
  )
}

export default () => (
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
    initialRouteName="Home"
    drawerContent={DrawerMenuContainer}
  >
    {(() => generateTabs(data))()}
  </Drawer.Navigator>
)
