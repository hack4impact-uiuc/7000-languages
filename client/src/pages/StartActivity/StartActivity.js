import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import StyledButton from 'components/StyledButton'
import { colors } from 'theme'
import { Text } from 'native-base'
import i18n from 'utils/i18n'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux' // import at the top of the file

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
    borderRadius: '100%',
    margin: 20,
  },
  instructionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    textAlign: 'left',
  },
})

const StartActivity = ({ navigation }) => {
  const { lessonData } = useSelector((state) => state.language)

  const [lessonTitle, setLessonTitle] = useState('')
  const [lessonNumber, setLessonNumber] = useState('')

  useEffect(() => {
    setLessonTitle(lessonData.name)
    setLessonNumber(lessonData._order + 1)
  }, [lessonData, setLessonNumber, setLessonTitle])

  return (
    <View style={styles.root}>
      <View style={styles.startContainer}>
        <Text fontFamily="heading" fontSize="2xl">
          {lessonTitle}
        </Text>
        <View style={styles.numberContainer}>
          <Text fontFamily="heading" fontSize="60" color={colors.blue.darker}>
            {lessonNumber}
          </Text>
        </View>
        <Text
          fontFamily="body"
          fontSize="md"
          color={colors.gray.dark}
          style={{ marginVertical: 20 }}
        >
          Matching L1 Audio to L2 Text
        </Text>
        <Text fontFamily="heading" fontSize="md">
          Instructions:{' '}
          <Text fontFamily="body" fontWeight="regular" fontStyle="normal">
            Here you will be presented some options and you will need to find
            the corresponding option to match with.
          </Text>
        </Text>
      </View>
      <StyledButton
        title={i18n.t('actions.startActivity')}
        variant="learner_primary"
        fontSize="20"
        style={{ height: 75, marginTop: 10 }}
        shadow
      />
    </View>
  )
}

// Home Base Case Object Fields
StartActivity.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

StartActivity.defaultProps = {
  navigation: { navigate: () => null },
}

export default StartActivity
