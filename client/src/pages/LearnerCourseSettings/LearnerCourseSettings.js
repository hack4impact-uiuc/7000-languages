import React from 'react'
import { Text } from 'native-base'
import StyledButton from 'components/StyledButton'
import { Alert, StyleSheet, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { removeCourse } from 'slices/language.slice'
import { Entypo } from '@expo/vector-icons'
import { leaveCourse } from 'api'
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

const LearnerCourseSettings = () => {
  const { currentCourseId } = useSelector((state) => state.language)

  const dispatch = useDispatch()

  const handleLeave = () => {
    // Call delete course endpoint
    leaveCourse(currentCourseId)
    // Remove course from Redux
    dispatch(removeCourse({ courseId: currentCourseId, isContributor: false }))
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.description}>
        <Text
          fontFamily="body"
          fontWeight="normal"
          fontSize="md"
          color="gray.medium"
        >
          {i18n.t('dialogue.learnerCourseSettingsDescription')}
        </Text>
      </View>

      <StyledButton
        style={styles.delete}
        variant="settings"
        title={i18n.t('dict.leaveCourse')}
        leftIcon={<Entypo name="log-out" color={colors.gray.dark} size={25} />}
        onPress={() => Alert.alert(
          i18n.t('dialogue.areYouSureLeaveCourse'),
          i18n.t('dialogue.actionCannotBeUndone'),
          [
            { text: i18n.t('dict.cancel') },
            {
              text: i18n.t('dict.leave'),
              onPress: handleLeave,
            },
          ],
        )}
      />
    </View>
  )
}

LearnerCourseSettings.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }),
}

LearnerCourseSettings.defaultProps = {
  navigation: { navigate: () => null, goBack: () => null },
}

export default LearnerCourseSettings
