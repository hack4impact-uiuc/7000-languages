import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'native-base'
import { StyleSheet, View } from 'react-native'
import StyledButton from 'components/StyledButton'
import { colors } from 'theme'
import FontIcon from 'react-native-vector-icons/Feather'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white.dark,
  },
  form: {
    width: '90%',
    height: '80%',
  },
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  body: {},
})

const Drawer = ({
  titleText,
  closeCallback,
  successCallback,
  successText,
  body,
}) => (
  <View style={styles.root}>
    <View style={styles.form}>
      <View style={styles.header}>
        <Text fontFamily="heading" fontWeight="regular" fontSize="2xl">
          {titleText}
        </Text>
        <FontIcon name="x" size={30} solid onPress={closeCallback} />
      </View>
      <View style={styles.body}>{body}</View>
    </View>
    <StyledButton
      title={successText}
      onPress={successCallback}
      variant="primary"
    />
  </View>
)
// Button object fields
Drawer.propTypes = {
  titleText: PropTypes.string,
  successText: PropTypes.string,
  closeCallback: PropTypes.func,
  successCallback: PropTypes.func,
  body: PropTypes.element,
}

Drawer.defaultProps = {
  titleText: '',
  successText: '',
  closeCallback: () => null,
  successCallback: () => null,
  body: null,
}

export default Drawer