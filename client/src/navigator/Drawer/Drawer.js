import React from 'react'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer'
import DrawerMenu from './DrawerMenu'
import TabNavigator from '../Tabs'
import { Text } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import { colors } from 'theme'
import { View, Pressable } from 'react-native'
import StyledButton from 'components/StyledButton'
import OwnershipButton from '../../components/OwnershipButton'


const Drawer = createDrawerNavigator()


const DrawerMenuContainer = (props) => {
  const { state, ...rest } = props;
  const newState = { ...state }
  let drawerApply = true; 
  
  return (
    <DrawerContentScrollView {...props}>
      <DrawerMenu {...props} />
      <DrawerItemList state={newState} {...rest} />
      
      {drawerApply ? (
        <Pressable
        style={{
        alignItems:'center',
        justifyContent:'center',
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius:10,
        marginHorizontal: 10,
        backgroundColor: '#F9F9F9'}}
        >
          <Text
      fontWeight="regular"
      color="gray.dark"
      fontSize="sm"
      textAlign="left"

    >
      Do you know an indigenous 
      language that you would like to share
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
    <StyledButton
    title="Apply Now"
    fontSize='sm'
    ></StyledButton>
    </Pressable>
          ) : null}
    </DrawerContentScrollView>
  )
}

export default () => (
  <Drawer.Navigator 
  screenOptions={{
    
  }}
    drawerContentOptions={{
    activeTintColor: 'black',
    inactiveTintColor: 'black',
    activeBackgroundColor: '#F9F9F9',
    inactiveBackgroundColor: 'white',
    itemStyle: {marginVertical: 2},
  }}
    initialRouteName="Home" 
    drawerContent={DrawerMenuContainer}
    >
      
    <Drawer.Screen 
      name="Spanish" 
      component={TabNavigator}
      options={({}) => ({
        drawerLabel: () => 
    <View
    style={{
      flexDirection: 'column',
    }}>
    <Text style={{ fontFamily: 'GT_Haptik_bold', fontSize: 20, flex: 3}}>Spanish</Text> 
    <Text style={{ fontFamily: 'GT_Haptik_regular', fontSize: 20, color: "#A4A4A4", flex: 3}}>14 Units</Text>
    </View>,
    drawerIcon: () => <FontAwesome 
    name="square"
    size={45}
    color={colors.red.dark}
    />
      })}
    
   />
    <Drawer.Screen 
      name="French"
      component={TabNavigator}
      options={({}) => ({
        drawerLabel: () => 
        <View style={{
          flexDirection: 'column',
        }}>
    <Text style={{ fontFamily: 'GT_Haptik_bold', fontSize: 20, flex: 0}}>French</Text> 
    <Text style={{ fontFamily: 'GT_Haptik_regular', fontSize: 20, color: "#A4A4A4", flex: 3}}>8 Units</Text>
    <OwnershipButton
    isContributor={true}
    ></OwnershipButton>
    </View>,
        drawerIcon: () => <FontAwesome 
        name="square"
        size={45}
        color={colors.blue.dark}
        />,
        
      })}

      />
    
    <Drawer.Screen 
      name="Chinese" 
      component={TabNavigator}
      options={({}) => ({
        drawerLabel: () => 
        <View>
    <Text style={{ fontFamily: 'GT_Haptik_bold', fontSize: 20,}}>Chinese</Text> 
    <Text style={{ fontFamily: 'GT_Haptik_regular', fontSize: 20, color: "#A4A4A4"}}>10 Units</Text>
    </View>,
        drawerIcon: () => <FontAwesome 
        name="square"
        size={45}
        color={colors.orange.dark}
        />
      })}
      />
        
  </Drawer.Navigator>
)
