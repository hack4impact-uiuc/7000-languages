import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import FontIcon from 'react-native-vector-icons/FontAwesome5'

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
    activeOpacity={true}
    underlayColor={"#00000020"}
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
