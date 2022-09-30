import { Entypo } from '@expo/vector-icons'
import React from 'react'
import { Pressable, View } from 'react-native'
import { colors } from 'theme'
import { Text } from 'native-base'
import { logout } from 'slices/auth.slice'
import { clear } from 'slices/language.slice'
import { useDispatch } from 'react-redux'
import { removeUserIDToken, removeUserClientId, removeUserRefreshToken } from 'utils/auth'

const DrawerLogoutButton = () => {
  const dispatch = useDispatch()
  const logoutUser = async () => {
    await removeUserIDToken()
    await removeUserClientId()
    await removeUserRefreshToken()
    dispatch(logout())
    dispatch(clear())
  }

  return (
    <View
      style={{
        marginTop: 15,
        marginLeft: 8,
        marginBottom: 35,
      }}
    >
      <Pressable onPress={logoutUser}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Entypo name="align-left" size={25} color={colors.red.dark} />
          <Text
            style={{
              fontSize: 20,
              marginLeft: 5,
            }}
            fontFamily="heading"
            fontWeight="regular"
            fontStyle="normal"
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
