import React, { useState } from 'react'
import { Text, Select, Divider } from 'native-base'
import StyledButton from 'components/StyledButton'
import { Alert, StyleSheet, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { changeVisibility } from 'api'
import { useErrorWrap } from 'hooks'
import { colors } from 'theme'
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
    bottom: 0,
    width: '90%',
  },
  save: {
    backgroundColor: colors.white.dark,
    flexDirection: 'row',
    justifyContent: 'center',
  },
})

const CourseSettings = ({navigation}) => {
  const [initialVisibility] = useState('public') // get from api
  const [visibility, setVisibility] = useState(initialVisibility)
  const [shouldShowButton, setShouldShowButton] = useState(false)
  const { currentCourseId, code } = useSelector((state) => state.language)

  const errorWrap = useErrorWrap()
  const dispatch = useDispatch()

  const handleVisibilityChange = async (value) => {
    setVisibility(value)
    setShouldShowButton(true)
  }

  // Update the API and redux
  const saveChanges = async () => {
    errorWrap(async () => {
      const isPrivate = visibility === 'private'

      // makes the API call
      await changeVisibility(currentCourseId, isPrivate)

      // updates the redux store
      dispatch({ is_private: isPrivate })
    })
  }

  const saveButton = shouldShowButton ? (
    <View>
      <Text fontFamily="body"
      fontWeight="normal"
      fontSize="md"
      color="gray.medium"
      >
        {i18n.t('dialog.courseSettingsSave')}
      </Text>
      <View style={styles.save}>
        <StyledButton
          title={i18n.t('actions.saveChanges')}
          variant="primary"
          fontSize="md"
          onPress={saveChanges}
          style={{ width: '90%' }}
        />
      </View>
    </View>
  ) : null

  const securityCode = visibility === 'private' ? (
      <View style={styles.body}>
        <Text fontFamily="heading" fontWeight="regular" fontSize="lg">
          {i18n.t('dict.securityCode')}
        </Text>
        <Text
          fontFamily="body"
          fontWeight="normal"
          fontSize="2xl"
          textAlign="right"
          my="5"
        >
          {code} {/* TODO: get this from the API */}
        </Text>
      </View>
  ): null

  const visibilitySelect = (currentVisibility) => (
    <Select
          defaultValue={currentVisibility}
          borderColor="black"
          height="35%"
          onValueChange={handleVisibilityChange}
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
      {saveButton}
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
                /* TODO: delete course */
              },
            },
          ],
        )}
      />
    </View>
  )
}

export default CourseSettings
