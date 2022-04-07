import { Entypo } from '@expo/vector-icons'
import React from 'react'
import { Pressable, View } from 'react-native'
import { colors } from 'theme'
import { Text } from 'native-base'
import { logout } from 'slices/auth.slice'
import { useDispatch } from 'react-redux'
import { removeUserIDToken } from '../../utils/auth'



const DrawerLogoutButton = () => {
const dispatch = useDispatch()
const logoutUser = async () => {
  await removeUserIDToken()
  dispatch(logout())
}

  return(
  <View
    style={{
      marginTop: 10,
      marginLeft: 8,
      marginBottom: 35,
    }}
  >
    <Pressable
    onPress={logoutUser}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Entypo name="align-left" size={25} color={colors.red.dark} />
        <Text
          style={{
            fontFamily: 'GT_Haptik_bold',
            fontSize: 20,
            marginLeft: 5,
          }}
          color="red.dark"
        >
          Log out
        </Text>
      </View>
    </Pressable>
  </View>
  )

}

export default DrawerLogoutButton
