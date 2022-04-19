import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Drawer from 'components/Drawer'
import {
  Input,
  Text,
  TextArea
} from 'native-base'

const CreateLesson = ({ navigation }) => {
  const close = () => {
    navigation.goBack()
  }

  const success = () => {

    const newUnit = {
      name,
      purpose,
    }
    console.log(newUnit, 'success')
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
        returnKeyType="done"
        onChangeText={(text) => setName(text)}
      />

      <Text>What are the goals of this lesson?</Text>

      <TextArea
        size="2xl"
        h={40}
        variant="filled"
        placeholder=""
        keyboardType="default"
        returnKeyType="done"
        blurOnSubmit
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

CreateUnit.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }),
}

CreateUnit.defaultProps = {
  navigation: { navigate: () => null, goBack: () => null },
}

export default CreateLesson