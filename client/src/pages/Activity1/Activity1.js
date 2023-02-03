import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import StyledButton from 'components/StyledButton'
import { colors } from 'theme'
import { Text } from 'native-base'
import i18n from 'utils/i18n'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux' // import at the top of the file
import { FontAwesome } from '@expo/vector-icons'
import { useErrorWrap } from 'hooks'
import { ACTIVITY_TYPE, QUESTION_STATE, ACTIVITY_DELAY } from 'utils/constants'
import { Audio } from 'expo-av'
import _ from 'lodash'
import { shuffle, getAudioURIGivenVocabItem } from 'utils/learnerHelper'

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },
  answerContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
  },
  playAudioContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.blue.medium_light,
    height: 110,
    width: 110,
    borderRadius: 110,
    margin: 20,
    shadowColor: colors.gray.darker,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  feedbackContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute',
    // top: '38%',
    width: '100%',
  },
})

const Activity1 = ({ navigation }) => {
  const errorWrap = useErrorWrap()

  const {
    lessonData, currentCourseId, currentUnitId, currentLessonId,
  } = useSelector((state) => state.language)

  const [questions, setQuestions] = useState([]) // Represents a list of all questions that the user will answer for this activity
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(-1) // The current index of the question that the user is on
  const [questionState, setQuestionState] = useState(QUESTION_STATE.IN_PROGRESS) // State representing whether the user has gotten the current question right, wrong, or not answered

  /* Called when the user has gone through all questions for this activity */
  const allDone = () => {
    // Navigate to the start screen for Activity 2
    navigation.navigate('Activity', {
      screen: 'StartActivity',
      params: { activityType: ACTIVITY_TYPE.L1_AUDIO },
    })
  }

  useEffect(() => {
    errorWrap(async () => {
      /*
                This method generates all of the questions that the user has to answer
            */

      const selectedData = lessonData.vocab.filter((item) => item.selected) // get all of the selected vocab items
      const vocabWithAudio = selectedData.filter((vocab) => vocab.audio !== '') // determine which vocab items have audio
      const vocabL2 = selectedData.map((vocab) => vocab.translation) // get the L2 for all of the vocab items

      const numOptions = Math.min(selectedData.length, 4) // determine how many answer options the user will have

      const shuffledVocabWithAudio = shuffle(vocabWithAudio) // shuffle the order of the vocab items that will be asked

      /* Get all of the audio URI of vocab items in a parallel manner */
      const fetchAllAudioList = []

      for (let i = 0; i < shuffledVocabWithAudio.length; i += 1) {
        const { _id, audio } = shuffledVocabWithAudio[i]
        fetchAllAudioList.push(
          getAudioURIGivenVocabItem(
            _id,
            audio,
            currentCourseId,
            currentUnitId,
            currentLessonId,
          ),
        )
      }

      const allAudioURIs = await Promise.all(fetchAllAudioList)

      const newQuestions = []

      // Build each question
      for (let i = 0; i < shuffledVocabWithAudio.length; i += 1) {
        const question = {
          uri: '',
          options: [],
          answer: '',
        }

        // fetch audio URI
        const { translation } = shuffledVocabWithAudio[i]

        // Set correct answer and uri
        question.uri = allAudioURIs[i]
        question.answer = translation

        const newOptions = [translation]

        // Build options, making sure to not take duplicate options
        for (let j = 0; j < numOptions - 1; j += 1) {
          if (
            vocabL2.filter((val) => newOptions.includes(val)).length
            === vocabL2.length
          ) {
            // All of the possible options are already in newOptions, so we can stop looking for new options
            break
          }

          let newOption = vocabL2[Math.floor(Math.random() * vocabL2.length)]

          while (newOptions.indexOf(newOption) >= 0) {
            newOption = vocabL2[Math.floor(Math.random() * vocabL2.length)]
          }
          newOptions.push(newOption)
        }

        // Don't forget to shuffle the options
        const shuffledOptions = shuffle(newOptions)

        question.options = shuffledOptions.map((option) => ({
          text: option,
          state: QUESTION_STATE.IN_PROGRESS,
        }))
        newQuestions.push(question)
      }

      if (newQuestions.length === 0) {
        allDone()
      } else {
        setQuestions(newQuestions)
        setCurrentQuestionIdx(0)
      }
    })
  }, [lessonData, currentCourseId, currentUnitId, currentLessonId])

  const updateOptionState = (optionText, newState) => {
    /**
     * Updates the state of an option after a user correctly or incorrectly answers that option
     */
    const questionsCopy = _.cloneDeep(questions)

    for (
      let i = 0;
      i < questionsCopy[currentQuestionIdx].options.length;
      i += 1
    ) {
      if (questionsCopy[currentQuestionIdx].options[i].text === optionText) {
        questionsCopy[currentQuestionIdx].options[i].state = newState
        break
      }
    }

    setQuestions(questionsCopy)
  }

  const nextQuestion = () => {
    /**
     * Move onto the next question or finish the activity
     */
    if (currentQuestionIdx + 1 >= questions.length) {
      allDone()
    } else {
      setQuestionState(QUESTION_STATE.IN_PROGRESS)
      setCurrentQuestionIdx(currentQuestionIdx + 1)
    }
  }

  const answerQuestion = (answer) => {
    /* Don't play audio and mark this as an option if:
        - The user has already answered correctly and we are in the delay state
      */
    if (
      currentQuestionIdx < 0
      || currentQuestionIdx >= questions.length
      || questionState === QUESTION_STATE.CORRECT
    ) {
      return false
    }

    if (questions[currentQuestionIdx].answer === answer) {
      setQuestionState(QUESTION_STATE.CORRECT)
      updateOptionState(answer, QUESTION_STATE.CORRECT)

      // Delay for a bit before presenting the next question
      setTimeout(() => {
        nextQuestion()
      }, ACTIVITY_DELAY)
    } else {
      // Mark option as incorrect and already answered
      setQuestionState(QUESTION_STATE.INCORRECT)
      updateOptionState(answer, QUESTION_STATE.INCORRECT)
    }
    return true
  }

  const generateOptions = () => {
    if (currentQuestionIdx < 0 || currentQuestionIdx >= questions.length) {
      return null
    }

    const allOptionComponents = questions[currentQuestionIdx].options.map(
      (option) => {
        let variant = 'learner_in_progress'
        switch (option.state) {
          case QUESTION_STATE.INCORRECT:
            variant = 'learner_incorrect'
            break
          case QUESTION_STATE.CORRECT:
            variant = 'learner_correct'
            break
          case QUESTION_STATE.IN_PROGRESS:
            variant = 'learner_in_progress'
            break
          default:
            break
        }
        return (
          <StyledButton
            key={`${option.text}`}
            title={option.text}
            variant={variant}
            fontSize="20"
            shadow
            onPress={() => answerQuestion(option.text)}
          />
        )
      },
    )

    return allOptionComponents
  }

  const generateFeedbackText = () => {
    switch (questionState) {
      case QUESTION_STATE.INCORRECT:
        return (
          <Text
            fontFamily="heading"
            fontWeight="regular"
            color="orange.medium_dark"
            fontSize={22}
          >
            {i18n.t('actions.tryAgain')}
          </Text>
        )
      case QUESTION_STATE.CORRECT:
        return (
          <Text
            fontFamily="heading"
            fontWeight="regular"
            color="green.medium_light"
            fontSize={22}
          >
            {i18n.t('actions.correct')}
          </Text>
        )
      case QUESTION_STATE.IN_PROGRESS:
        return null
      default:
        return null
    }
  }

  const playAudio = async () => {
    await errorWrap(async () => {
      if (
        currentQuestionIdx < 0
        || currentQuestionIdx >= questions.length
        || questionState === QUESTION_STATE.CORRECT
      ) {
        return
      }

      const { uri } = questions[currentQuestionIdx]

      if (uri) {
        // Plays audio recording
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
        })
        const { sound } = await Audio.Sound.createAsync({ uri })
        await sound.playAsync()
      }
    })
  }
  return (
    <View style={styles.root}>
      <Text
        fontFamily="heading"
        fontWeight="regular"
        color="gray.dark"
        fontStyle="italic"
        fontSize="lg"
      >
        {currentQuestionIdx + 1}/{questions.length}
      </Text>
      <View style={styles.feedbackContainer}>
        <TouchableOpacity style={styles.playAudioContainer} onPress={playAudio}>
          <FontAwesome name="volume-up" size={45} color={colors.blue.darker} />
        </TouchableOpacity>
        {generateFeedbackText()}
      </View>
      <View style={styles.answerContainer}>{generateOptions()}</View>
    </View>
  )
}

// Home Base Case Object Fields
Activity1.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Activity1.defaultProps = {
  navigation: { navigate: () => null },
}

export default Activity1
