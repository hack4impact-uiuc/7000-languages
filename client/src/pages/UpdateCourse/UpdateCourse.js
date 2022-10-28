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
  const { currentCourseId, allCourses } = useSelector((state) => state.language)

  const [name, setName] = useState('')
  const [purpose, setPurpose] = useState('')

  // checks if all fields are filled
  // otherwise, the submit button is disabled
  const areRequiredFieldsFilled = name !== '' && purpose !== ''

  useEffect(() => {
    const courseIndex = allCourses.findIndex(
      (element) => element._id === currentCourseId,
    )
    const courseDetails = allCourses[courseIndex]

    setName(courseDetails.name)
    setPurpose(courseDetails.alternative_name)
  }, [currentCourseId, allCourses])
  /**
   * Posts a new course to the API and saves the new course in state
   */
  const success = async () => {
    errorWrap(
      async () => {
        let updatedCourseItem = null
        const updates = {
          name,
          alternative_name: purpose,
        }
        // error here is that the course is not being updated
        const courseItemResponse = await updateCourse(currentCourseId, updates)
        updatedCourseItem = courseItemResponse.result
        // Update course in Redux store
        dispatch(patchSelectedCourse({ lesson: updatedCourseItem }))
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
              Suggestion{' '}
            </Text>
          </View>
          <Text color={colors.blue.dark} fontSize="md">
            When updating a course, think about how it will be used.
          </Text>
        </View>

        <RequiredField title="Change your course name" fontSize="md" />
        <Input
          size="xl"
          placeholder=""
          returnKeyType="done"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <Text
          fontFamily="body"
          fontWeight="regular"
          color="black"
          fontStyle="normal"
          fontSize="md"
          paddingTop={2}
        >
          Change the alternative name for your course
        </Text>
        <TextArea
          size="xl"
          h={40}
          placeholder=""
          keyboardType="default"
          returnKeyType="done"
          blurOnSubmit
          value={purpose}
          onChangeText={(text) => setPurpose(text)}
        />
      </View>
    </>
  )

  return (
    <Drawer
      titleText="Edit Course"
      successText="Confirm Edit"
      successCallback={success}
      closeCallback={close}
      isDisabled={!areRequiredFieldsFilled}
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
