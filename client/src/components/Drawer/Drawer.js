import React, { useState, useEffect } from 'react'
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
    marginTop: 10,
    width: '95%',
    height: '5%',
  },
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  body: {
    marginTop: 15,
    width: '95%',
    flex: 1,
    height: '80%',
  },
})

const Drawer = ({
  titleText,
  closeCallback,
  successCallback,
  areAllFieldsFilled,
  successText,
  body,
}) => {
  const [isDisabled, setDisabled] = useState(!areAllFieldsFilled) // used to disable success button
  // sets the initial state of areAllFieldsFilled state to the areAllFieldsFilled param
  useEffect(() => setDisabled(!areAllFieldsFilled), [areAllFieldsFilled])
  // always listening to when isDisabled is changed

  const onPress = () => {
    if (!isDisabled) {
      setDisabled(true)
      successCallback()
    }
  }
  return (
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
      </View>
      <ScrollView
        style={styles.body}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {body}
      </ScrollView>
      <StyledButton
        style={{ marginBottom: 40 }}
        title={successText}
        onPress={onPress}
        isDisabled={isDisabled}
        variant="primary"
      />
    </KeyboardAvoidingView>
  )
}
// Button object fields
Drawer.propTypes = {
  titleText: PropTypes.string,
  successText: PropTypes.string,
  closeCallback: PropTypes.func,
  successCallback: PropTypes.func,
  areAllFieldsFilled: PropTypes.bool,
  body: PropTypes.element,
}

Drawer.defaultProps = {
  titleText: '',
  successText: '',
  closeCallback: () => null,
  successCallback: () => null,
  areAllFieldsFilled: false,
  body: null,
}

export default Drawer
