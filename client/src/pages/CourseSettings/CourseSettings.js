import React, { useState } from 'react'
import { Text, Select, Divider } from 'native-base'
import StyledButton from 'components/StyledButton'
import { Alert, StyleSheet, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { updateCourseVisibility } from 'slices/language.slice'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { changeVisibility, deleteCourse } from 'api'
import { useErrorWrap } from 'hooks'
import { colors } from 'theme'
import PropTypes from 'prop-types'
import i18n from 'utils/i18n'

const styles = StyleSheet.create({
  description: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: '3%',
    width: '95%',
    height: 'auto',
  },
  body: {
    marginHorizontal: '5%',
    width: '90%',
  },
  delete: {
    position: 'absolute',
    bottom: '0%',
    width: '90%',
  },
})

const CourseSettings = ({ navigation }) => {
  const { currentCourseId, courseDetails } = useSelector(
    (state) => state.language,
  )
  const [visibility, setVisibility] = useState(
    courseDetails.is_private ? 'private' : 'public',
  )
  const [shouldShowButton, setShouldShowButton] = useState(false)
  const { code } = courseDetails

  const errorWrap = useErrorWrap()
  const dispatch = useDispatch()

  // Update the API and redux
  const saveChanges = async () => {
    errorWrap(async () => {
      const isPrivate = visibility === 'private'

      // disables save button
      setShouldShowButton(false)

      // makes the API call
      await changeVisibility(currentCourseId, isPrivate)

      // updates the redux store
      dispatch(updateCourseVisibility({ is_private: isPrivate }))
    }, navigation.goBack())
  }

  const securityCode = visibility === 'private' ? (
    <View style={styles.body}>
      <Text fontFamily="heading" fontWeight="regular" fontSize="lg">
        {i18n.t('dict.securityCode')}
      </Text>
      <Text
        fontFamily="body"
        fontWeight="normal"
        fontSize="2xl"
        textAlign="left"
        my="5"
      >
        {code}
      </Text>
    </View>
  ) : null

  const visibilitySelect = (currentVisibility) => (
    <Select
      defaultValue={currentVisibility}
      borderColor="black"
      height="35%"
      onValueChange={saveChanges}
    >
      <Select.Item label={i18n.t('dict.public')} value="public" />
      <Select.Item label={i18n.t('dict.private')} value="private" />
    </Select>
  )

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.description}>
        <Text
          fontFamily="body"
          fontWeight="normal"
          fontSize="md"
          color="gray.medium"
        >
          {i18n.t('dialogue.courseSettingsDescription')}
        </Text>
      </View>
      <View style={styles.body}>
        <Text fontFamily="heading" fontWeight="regular" fontSize="lg">
          {i18n.t('dict.privacy')}
        </Text>
        {visibilitySelect(visibility)}
      </View>
      {securityCode}
      <Divider />
      <StyledButton
        style={styles.delete}
        variant="settings"
        title={i18n.t('dict.deleteCourse')}
        leftIcon={
          <MaterialCommunityIcons name="delete" color="black" size={20} />
        }
        onPress={() => Alert.alert(
          'Are you sure you want to delete this course?',
          'This action cannot be undone.',
          [
            { text: 'Cancel' },
            {
              text: 'Delete',
              onPress: () => {
                deleteCourse(currentCourseId)
              },
            },
          ],
        )}
      />
    </View>
  )
}

CourseSettings.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }),
}

CourseSettings.defaultProps = {
  navigation: { navigate: () => null, goBack: () => null },
}

export default CourseSettings
