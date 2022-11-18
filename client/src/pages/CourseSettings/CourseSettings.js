import React, { useState, useEffect } from 'react'
import { Text, Select, Input } from 'native-base'
import StyledButton from 'components/StyledButton'
import { Alert, StyleSheet, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import {
  updateCourseVisibility,
  updateSecurityCode,
} from 'slices/language.slice'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { patchVisibility, patchSecurityCode, deleteCourse } from 'api'
import { useErrorWrap } from 'hooks'
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
  const saveVisibilityChanges = async () => {
    errorWrap(async () => {
      const isPrivate = visibility === 'private'

      // makes the API call
      const { result } = await patchVisibility(currentCourseId, isPrivate)
      const success = result?.data?.success

      // updates the redux store
      if (success) {
        dispatch(updateCourseVisibility({ is_private: isPrivate }))
      }
    })
  }

  const handleVisibilityChange = async (value) => {
    setVisibility(value)
    saveVisibilityChanges()
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
        fontFamily="body"
        fontWeight="normal"
        fontSize="2xl"
        textAlign="left"
        my="5"
        onEndEditing={(e) => setCode(e.nativeEvent.text)}
      >
        {code}
      </Input>
    </View>
  ) : null

  const visibilitySelect = (currentVisibility) => (
    <>
      <Select
        defaultValue={currentVisibility}
        borderColor="black"
        onValueChange={handleVisibilityChange}
      >
        <Select.Item label={i18n.t('dict.public')} value="public" />
        <Select.Item label={i18n.t('dict.private')} value="private" />
      </Select>
    </>
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
