import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import Drawer from 'components/Drawer'
import { Input, TextArea, Text } from 'native-base'
import { Foundation } from '@expo/vector-icons'
import { colors } from 'theme'
import { useSelector, useDispatch } from 'react-redux'
import { addLesson } from 'slices/language.slice'
import { createLesson } from 'api'
import { useErrorWrap } from 'hooks'
import RequiredField from 'components/RequiredField'

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    borderWidth: 0.5,
    padding: 8,
    marginBottom: 10,
    backgroundColor: colors.blue.light,
    borderColor: colors.blue.light,
  },
  textRow: {
    flexDirection: 'row',
  },
})
const CreateLesson = ({ navigation }) => {
  const errorWrap = useErrorWrap()
  const dispatch = useDispatch()
  const { currentCourseId, currentUnitId } = useSelector(
    (state) => state.language,
  )
  const [name, setName] = useState('') // the name of the lesson
  const [purpose, setPurpose] = useState('') // the purpose/description of the lesson

  // checks if all fields are filled
  // otherwise, the submit button is disabled
  const areRequiredFieldsFilled = name !== '' && purpose !== '';

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

        const { result } = await createLesson(
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
            <View style={styles.container}>
          <View style={styles.textRow}>
            <Foundation name="lightbulb" size={20} color={colors.blue.dark} />
            <Text
              fontSize="md"
              paddingBottom={2}
              fontFamily="heading"
              fontWeight="regular"
              fontStyle="normal"
              color={colors.blue.dark}
            >
              {' '}
              Suggestion{' '}
            </Text>
          </View>
          <Text color={colors.blue.dark} fontSize="md">
          When creating a lesson, think about which vocab items will be associated with the lesson and how it will be used.
          </Text>
        </View>
      <RequiredField title="Give your lesson a name" />
      <Input
        size="xl"
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
      titleText="Add Custom Lesson"
      successText="Create Lesson"
      successCallback={success}
      closeCallback={close}
      isDisabled={!areRequiredFieldsFilled}
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
