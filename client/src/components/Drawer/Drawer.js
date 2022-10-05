import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'native-base'
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Platform,
} from 'react-native'
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
    width: '95%',
    height: '80%',
  },
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  body: {
    width: '100%',
  },
})

const Drawer = ({
  titleText,
  closeCallback,
  successCallback,
  isDisabled,
  successText,
  body,
}) => (
  <KeyboardAvoidingView
    KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.root}
  >
    <View style={styles.form}>
      <View style={styles.header}>
        <Text fontFamily="heading" fontWeight="regular" fontSize="2xl">
          {titleText}
        </Text>
        <FontIcon name="x" size={30} solid onPress={closeCallback} />
      </View>
      <ScrollView style={styles.body}>{body}</ScrollView>
    </View>
    <StyledButton
      title={successText}
      onPress={successCallback}
      isDisabled={isDisabled}
      variant="primary"
    />
  </KeyboardAvoidingView>
)
// Button object fields
Drawer.propTypes = {
  titleText: PropTypes.string,
  successText: PropTypes.string,
  closeCallback: PropTypes.func,
  successCallback: PropTypes.func,
  isDisabled: PropTypes.bool,
  body: PropTypes.element,
}

Drawer.defaultProps = {
  titleText: '',
  successText: '',
  closeCallback: () => null,
  successCallback: () => null,
  isDisabled: false,
  body: null,
}

export default Drawer
