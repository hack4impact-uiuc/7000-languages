import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import Drawer from 'components/Drawer'
import { colors } from 'theme'
import { Input, Text, TextArea } from 'native-base'
import { Foundation } from '@expo/vector-icons'
import { patchSelectedCourse } from 'slices/language.slice'
import { updateCourse } from 'api'
import { useSelector, useDispatch } from 'react-redux'
import { useErrorWrap } from 'hooks'
import RequiredField from 'components/RequiredField'
import i18n from 'utils/i18n'

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

const UpdateCourse = ({ navigation }) => {
  const close = () => {
    navigation.goBack()
  }

  const errorWrap = useErrorWrap()
  const dispatch = useDispatch()
  const { currentCourseId, courseDetails } = useSelector(
    (state) => state.language,
  )

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [alternativeName, setAlternativeName] = useState('')
  const [translatedLanguage, setTranslatedLanguage] = useState('')

  // checks if all fields are filled
  // otherwise, the submit button is disabled
  const areRequiredFieldsFilled = name !== '' && translatedLanguage !== ''

  useEffect(() => {
    setName(courseDetails.name)
    setDescription(courseDetails.description)
    setAlternativeName(courseDetails.alternative_name)
    setTranslatedLanguage(courseDetails.translated_language)
  }, [courseDetails])
  /**
   * Posts a new course to the API and saves the new course in state
   */
  const success = async () => {
    errorWrap(
      async () => {
        let updatedCourseItem = null
        const updates = {
          name,
          description,
          alternative_name: alternativeName,
          translated_language: translatedLanguage,
        }
        const courseItemResponse = await updateCourse(currentCourseId, updates)
        updatedCourseItem = courseItemResponse.result
        // Update course in Redux store
        dispatch(patchSelectedCourse({ course: updatedCourseItem }))
      },
      () => {
        // on success, close the modal
        close()
      },
    )
  }

  const body = (
    <>
      <View
        style={{
          width: '97%',
          marginHorizontal: '1%',
          justifyContent: 'center',
        }}
      >
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
              {i18n.t('dict.suggestion')}{' '}
            </Text>
          </View>
          <Text color={colors.blue.dark} fontSize="md">
            {i18n.t('dialogue.updateCourse')}{' '}
          </Text>
        </View>

        <RequiredField
          title={i18n.t('dialogue.changeCourseName')}
          fontSize="md"
        />

        <Input
          size="xl"
          placeholder=""
          returnKeyType="done"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <Text fontSize="md">{i18n.t('dialogue.changeAlternativeText')}</Text>

        <Input
          size="xl"
          placeholder=""
          returnKeyType="done"
          value={alternativeName}
          onChangeText={(text) => setAlternativeName(text)}
        />

        <RequiredField
          title={i18n.t('dialogue.changeTeachingLanguage')}
          fontSize="md"
        />

        <Text fontSize="sm" color="gray.medium">
          {i18n.t('dialogue.teachingChosenLanguage')}
        </Text>

        <Input
          size="xl"
          placeholder=""
          returnKeyType="done"
          value={translatedLanguage}
          onChangeText={(text) => setTranslatedLanguage(text)}
        />

        <Text
          fontFamily="body"
          fontWeight="regular"
          color="black"
          fontStyle="normal"
          fontSize="md"
          paddingTop={2}
        >
          {i18n.t('dialogue.editCourseDescription')}
        </Text>
        <TextArea
          size="xl"
          h={40}
          placeholder=""
          keyboardType="default"
          returnKeyType="done"
          blurOnSubmit
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
      </View>
    </>
  )

  return (
    <Drawer
      titleText={i18n.t('actions.editCourse')}
      successText={i18n.t('actions.confirmEdit')}
      successCallback={success}
      closeCallback={close}
      areAllFieldsFilled={areRequiredFieldsFilled}
      body={body}
    />
  )
}

UpdateCourse.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }),
}

UpdateCourse.defaultProps = {
  navigation: { navigate: () => null, goBack: () => null },
}

export default UpdateCourse
