import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Drawer from 'components/Drawer'
import { Input, TextArea } from 'native-base'

import { useSelector, useDispatch } from 'react-redux'
import { addLesson } from 'slices/language.slice'
import { updateLesson } from 'api' //create update lesson
import { useErrorWrap } from 'hooks'
import RequiredField from 'components/RequiredField'

const UpdateLesson = ({ navigation }) => {
  const errorWrap = useErrorWrap()
  const dispatch = useDispatch()
  const { currentCourseId, currentUnitId } = useSelector(
    (state) => state.language,
  )
  const [name, setName] = useState('') // the name of the lesson
  const [purpose, setPurpose] = useState('') // the purpose/description of the lesson

  // checks if all fields are filled
  // otherwise, the submit button is disabled
  const areRequiredFieldsFilled = name !== '' && purpose !== ''

  // Closes the modal
  const close = () => {
    navigation.goBack()
  }

  // Posts the new lesson to the API and updates the state
  const success = async () => {
    errorWrap(
      async () => {
        const newLesson = {
          name,
          description: purpose,
          selected: true,
        }

        const { result } = await updateLesson(
          currentCourseId,
          currentUnitId,
          newLesson, 
        )

        // All new lessons have 0 vocab items, and we must set this since this information
        // will be presented on the app
        result.num_vocab = 0

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
      <RequiredField title="Change your lesson name" />
      <Input
        size="lg"
        placeholder=""
        returnKeyType="done"
        onChangeText={(text) => setName(text)}
      />

      <RequiredField title="What are the goals of this lesson?" />
      <TextArea
        size="xl"
        h={40}
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
      titleText="Edit Lesson"
      successText="Confirm Edit"
      successCallback={success}
      closeCallback={close}
      isDisabled={!areRequiredFieldsFilled}
      body={body}
    />
  )
}

UpdateLesson.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }),
}

UpdateLesson.defaultProps = {
  navigation: { navigate: () => null, goBack: () => null },
}

export default UpdateLesson
