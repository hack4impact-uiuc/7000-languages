import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import StyledButton from 'components/StyledButton'
import { colors } from 'theme'
import { Text } from 'native-base'
import i18n from 'utils/i18n'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux' // import at the top of the file
import { ACTIVITY_TYPE, TOTAL_ACTIVITIES } from 'utils/constants'

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '100%',
  },
  startContainer: {
    backgroundColor: colors.gray.light,
    borderWidth: 2,
    borderColor: colors.gray.semi_light,
    borderRadius: 12,
    margin: 4,
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 10,
  },
  numberContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.blue.medium_light,
    height: 130,
    width: 130,
    borderRadius: 130,
    margin: 20,
  },
  instructionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    textAlign: 'left',
  },
})

const StartActivity = ({ navigation, route }) => {
  const { lessonData } = useSelector((state) => state.language)

  const [lessonTitle, setLessonTitle] = useState('')

  useEffect(() => {
    setLessonTitle(lessonData.name)
  }, [lessonData, setLessonTitle])

  useEffect(() => {
    if (route.params.activityType != null) {
      navigation.setOptions({
        title: `${i18n.t('dict.activity')} ${route.params.activityType + 1}`,
      })
    }
  }, [route])

  const startActivity = () => {
    const activityNumber = route.params.activityType
    if (activityNumber >= TOTAL_ACTIVITIES) {
      navigation.navigate('Drawer', { screen: 'Congrats' })
    } else {
      const activityScreen = `Activity${route.params.activityType + 1}`
      navigation.navigate('Activity', { screen: activityScreen })
    }
  }

  const generateActivityTypeText = () => {
    if (route.params.activityType != null) {
      switch (route.params.activityType) {
        case ACTIVITY_TYPE.AUDIO_L2:
          return i18n.t('dialogue.activity1')
        case ACTIVITY_TYPE.L1_AUDIO:
          return i18n.t('dialogue.activity2')
        default:
          return ''
      }
    }
    return ''
  }

  return (
    <View style={styles.root}>
      <View style={styles.startContainer}>
        <Text fontFamily="heading" fontSize="2xl">
          {lessonTitle}
        </Text>
        <View style={styles.numberContainer}>
          <Text fontFamily="heading" fontSize="60" color={colors.blue.darker}>
            {route.params.activityType + 1}
          </Text>
        </View>
        <Text
          fontFamily="body"
          fontSize="md"
          color={colors.gray.dark}
          style={{ marginVertical: 20 }}
        >
          {generateActivityTypeText()}
        </Text>
        <Text fontFamily="heading" fontSize="md">
          {i18n.t('dict.instructions')}
          {': '}
          <Text fontFamily="body" fontWeight="regular" fontStyle="normal">
            {i18n.t('dialogue.activityInstructions')}
          </Text>
        </Text>
      </View>
      <StyledButton
        title={i18n.t('actions.startActivity')}
        variant="learner_primary"
        fontSize="20"
        style={{ height: 75, marginTop: 10, width: '90%' }}
        shadow
        onPress={startActivity}
      />
    </View>
  )
}

// Home Base Case Object Fields
StartActivity.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    setOptions: PropTypes.func,
  }),
  route: PropTypes.shape({
    params: PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
  }),
}

StartActivity.defaultProps = {
  navigation: { navigate: () => null, setOptions: () => null },
  route: { params: {} },
}

export default StartActivity
