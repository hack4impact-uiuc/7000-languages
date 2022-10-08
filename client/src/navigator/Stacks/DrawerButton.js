import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { colors } from 'theme'

const styles = StyleSheet.create({
  button: {
    paddingLeft: 15,
  },
})

const DrawerButton = ({ navigation }) => (
  <FontIcon.Button
    name="bars"
    color="white"
    backgroundColor="transparent"
    size={25}
    underlayColor={colors.gray.semi_transparent}
    onPress={() => {
      navigation.openDrawer()
    }}
    style={styles.button}
  />
)

DrawerButton.propTypes = {
  navigation: PropTypes.shape({
    openDrawer: PropTypes.func,
  }),
}

DrawerButton.defaultProps = {
  navigation: { openDrawer: () => null },
}

export default DrawerButton
