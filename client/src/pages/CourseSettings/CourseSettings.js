import React, { useState, useEffect } from 'react'
import { Text, Select, Input } from 'native-base'
import StyledButton from 'components/StyledButton'
import { Alert, StyleSheet, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import {
  updateCourseVisibility,
  updateSecurityCode,
  removeCourse,
} from 'slices/language.slice'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { patchVisibility, patchSecurityCode, deleteCourse } from 'api'
import { useErrorWrap } from 'hooks'
import PropTypes from 'prop-types'
import i18n from 'utils/i18n'
import { colors } from 'theme'

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

const CourseSettings = () => {
  const { currentCourseId, courseDetails } = useSelector(
    (state) => state.language,
  )
  const [visibility, setVisibility] = useState(
    courseDetails.is_private ? 'private' : 'public',
  )

  const [code, setCode] = useState(courseDetails.code)

  const errorWrap = useErrorWrap()
  const dispatch = useDispatch()

  // Update the API and redux
  const saveVisibilityChanges = async (newVisibility) => {
    errorWrap(async () => {
      const isPrivate = newVisibility === 'private'

      // makes the API call
      const { result } = await patchVisibility(currentCourseId, isPrivate)
      const success = result?.data?.success

      // updates the redux store
      if (success) {
        dispatch(updateCourseVisibility({ is_private: isPrivate }))
      }
    })
  }

  const handleVisibilityChange = async (newVisibility) => {
    setVisibility(newVisibility)
    saveVisibilityChanges(newVisibility)
  }

  const handleCodeChange = async () => {
    errorWrap(async () => {
      const { result } = await patchSecurityCode(currentCourseId, code)
      const success = result?.data?.success

      // updates the redux store
      if (success) {
        dispatch(updateSecurityCode({ code }))
      }
    })
  }

  useEffect(() => {
    handleCodeChange()
  }, [code])

  const handleDelete = () => {
    // Call delete course endpoint
    deleteCourse(currentCourseId)
    // Remove course from Redux
    dispatch(removeCourse({ courseId: currentCourseId, isContributor: true }))
  }

  const securityCode = visibility === 'private' ? (
    <View style={styles.body}>
      <Text fontFamily="heading" fontWeight="regular" fontSize="lg">
        {i18n.t('dict.securityCode')}
      </Text>
      <Text
        fontFamily="body"
        fontWeight="normal"
        fontSize="md"
        color="gray.medium"
      >
        {i18n.t('dialogue.courseSettingsChangeCode')}
      </Text>
      <Input
        _text={{
          fontFamily: 'body',
          fontWeight: 'normal',
        }}
        fontSize="xl"
        textAlign="left"
        my="5"
        onEndEditing={(e) => setCode(e.nativeEvent.text)}
      >
        {code}
      </Input>
    </View>
  ) : null

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
        <Select
          defaultValue={visibility}
          borderColor="black"
          onValueChange={handleVisibilityChange}
        >
          <Select.Item label={i18n.t('dict.public')} value="public" />
          <Select.Item label={i18n.t('dict.private')} value="private" />
        </Select>
      </View>
      {securityCode}
      <StyledButton
        style={styles.delete}
        variant="settings"
        title={i18n.t('dict.deleteCourse')}
        leftIcon={(
          <MaterialCommunityIcons
            name="delete"
            color={colors.gray.dark}
            size={20}
          />
        )}
        onPress={() => Alert.alert(
          i18n.t('dialogue.areYouSureDeleteCourse'),
          i18n.t('dialogue.actionCannotBeUndone'),
          [
            { text: i18n.t('dict.cancel') },
            {
              text: i18n.t('dict.delete'),
              onPress: handleDelete,
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
