import { Entypo } from '@expo/vector-icons'
import React from 'react'
import { Pressable, View } from 'react-native'
import { colors } from 'theme'
import { Text } from 'native-base'
import { logout } from 'slices/auth.slice'
import { clear } from 'slices/language.slice'
import { useDispatch } from 'react-redux'
import i18n from 'utils/i18n'
import { removeUserIDToken, removeUserRefreshToken } from 'utils/auth'

const DrawerLogoutButton = () => {
  const dispatch = useDispatch()
  const logoutUser = async () => {
    removeUserIDToken()
    removeUserRefreshToken()
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
          <Entypo name="align-left" size={25} color={colors.red.medium_dark} />
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
            {i18n.t('actions.logOut')}
          </Text>
        </View>
      </Pressable>
    </View>
  )
}

export default DrawerLogoutButton
