import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Drawer from 'components/Drawer'
import { colors, fonts } from 'theme'
import {
  Input,
  Text,
  TextArea,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'native-base'
import dismissKeyboard from 'react-native-dismiss-keyboard'

const CreateLesson = ({ navigation }) => {
  const close = () => {
    navigation.goBack()
  }

  const success = () => {
    // call api request here
    console.log('success')
  }

  const [name, setName] = useState('')
  const [purpose, setPurpose] = useState('')

  const body = (
    <>
      <Text>Give your lesson a name</Text>
      <Input
        size="lg"
        variant="filled"
        placeholder=""
        onChangeText={(text) => setName(text)}
      />

      <Text>What are the goals of this lesson?</Text>

      <TextArea
        size="2xl"
        h={40}
        variant="filled"
        placeholder=""
        onChangeText={(text) => setPurpose(text)}
      />
    </>
  )

  return (
    <Drawer
      titleText="Add Custom Lesson"
      successText="Create Lesson"
      successCallback={success}
      closeCallback={close}
      body={body}
    />
  )
}

CreateLesson.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }),
}

CreateLesson.defaultProps = {
  navigation: { navigate: () => null, goBack: () => null },
}

export default CreateLesson

