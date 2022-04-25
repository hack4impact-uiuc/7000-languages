import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Drawer from 'components/Drawer'
import { Input, Text, TextArea } from 'native-base'

import { useSelector, useDispatch } from 'react-redux'
import { addLesson } from 'slices/language.slice'
import { createLesson } from 'api'
import useErrorWrap from 'hooks/useErrorWrap'

const CreateLesson = ({ navigation }) => {
  const errorWrap = useErrorWrap()
  const dispatch = useDispatch()
  const { currentCourseId, currentUnitId } = useSelector(
    (state) => state.language,
  )

  const close = () => {
    navigation.goBack()
  }

  const [name, setName] = useState('')
  const [purpose, setPurpose] = useState('')

  const success = async () => {
    errorWrap(
      async () => {
        const newLesson = {
          name,
          description: purpose,
        }

        const { result } = await createLesson(
          currentCourseId,
          currentUnitId,
          newLesson,
        )
        dispatch(addLesson({ lesson: result }))
      },
      () => {
        // on success, close the modal
        close()
      },
    )
  }

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
