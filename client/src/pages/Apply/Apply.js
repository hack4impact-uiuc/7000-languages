import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, StatusBar } from 'react-native'
import StyledButton from 'components/StyledButton'
import { colors } from 'theme'
import { Text } from 'native-base'
import { authenticate, removeToken } from 'slices/auth.slice'
import { useDispatch } from 'react-redux'
import { removeUserIDToken } from '../../utils/auth'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray.light,
  },
})

const Apply = ({ navigation }) => {


  

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Text
        fontWeight="regular"
        color="blue.dark"
        fontStyle="italic"
        fontSize="6xl"
      >
        Home
      </Text>
      <Text fontSize="6xl">Wassup</Text>
      <StyledButton
        title="Primary Button"
        variant="primary"
        onPress={() => {
          navigation.navigate('Details', { from: 'Home' })
        }}
      />
      <StyledButton title="Logout" type="secondary" onPress={logoutUser} />
    </View>
  )
}

Apply.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Apply.defaultProps = {
  navigation: { navigate: () => null },
}

export default Apply
