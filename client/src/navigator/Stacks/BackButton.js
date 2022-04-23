import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import FontIcon from 'react-native-vector-icons/FontAwesome5'

const styles = StyleSheet.create({
  button: {
    paddingLeft: 15,
  },
})

const BackButton = ({ navigation, color }) => (
  <FontIcon.Button
    name="arrow-left"
    color={color}
    size={25}
    backgroundColor="transparent"
    onPress={navigation.goBack}
    style={styles.button}
  />
)

BackButton.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
  color: PropTypes.string,
}

BackButton.defaultProps = {
  navigation: { goBack: () => null },
  color: 'black',
}

export default BackButton

/*

2. Create Selected Units and Unselected Units header
3. Add add units button
4. Add necessary props so far
5. Create simple card
6. Test out card functionality
7. Link up to state
8. Set up proper callbacks

*/
