import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import StyledButton from 'components/StyledButton'
import { colors } from 'theme'
import { Text } from 'native-base'
import i18n from 'utils/i18n'
import PropTypes from 'prop-types'
import { FontAwesome } from '@expo/vector-icons'
import { useErrorWrap } from 'hooks'
import { QUESTION_STATE, ACTIVITY_DELAY } from 'utils/constants'
import { Audio } from 'expo-av'
import _ from 'lodash'
import { shuffle, getAudioURIGivenVocabItem } from 'utils/learnerHelper'
import { markLessonAsComplete } from 'api'
import { useDispatch, useSelector } from 'react-redux'
import { setLessonToComplete } from 'slices/language.slice'

const styles = StyleSheet.create({
  root: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    textAlign: 'center',
  },
  answerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
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
    width: '100%',
  },
})

const Activity2 = ({ navigation }) => {
  const errorWrap = useErrorWrap()
  const dispatch = useDispatch()

  const {
    lessonData, currentCourseId, currentUnitId, currentLessonId,
  } = useSelector((state) => state.language)

  const [questions, setQuestions] = useState([]) // Represents a list of all questions that the user will answer for this activity
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(-1) // The current index of the question that the user is on
  const [questionState, setQuestionState] = useState(QUESTION_STATE.IN_PROGRESS) // State representing whether the user has gotten the current question right, wrong, or not answered

  const [selectedOptionIdx, setSelectedOptionIdx] = useState(-1) // Represents the current option that is selected by the user in the activity

  const allDone = async () => {
    await markLessonAsComplete(currentCourseId, currentUnitId, currentLessonId)
    dispatch(setLessonToComplete({}))
    navigation.navigate('Activity', { screen: 'Congrats' })
  }

  useEffect(() => {
    errorWrap(async () => {
      /*
        This method generates all of the questions that the user has to answer
      */

      const selectedData = lessonData.vocab.filter((item) => item.selected) // get all of the selected vocab items
      const vocabWithAudio = selectedData.filter((vocab) => vocab.audio !== '') // determine which vocab items have audio
      const numOptions = Math.min(vocabWithAudio.length, 4) // determine how many answer options the user will have

      /* Get all of the audio URI of vocab items in a parallel manner */
      const fetchAllAudioList = []

      for (let i = 0; i < vocabWithAudio.length; i += 1) {
        const { _id, audio } = vocabWithAudio[i]
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

      // Using the Audio URI, build a list of vocab items' audio URI and L1
      const vocabAudioL1 = allAudioURIs.map((uri, idx) => ({
        l1: vocabWithAudio[idx].original,
        uri,
      }))

      const newQuestions = []
      const shuffledVocabWithAudio = shuffle(vocabAudioL1)

      // Build each question
      for (let i = 0; i < shuffledVocabWithAudio.length; i += 1) {
        const question = {
          l1: '',
          options: [],
          answer: '',
        }

        // fetch audio URI
        const { l1, uri } = shuffledVocabWithAudio[i]

        // Set correct answer
        question.l1 = l1
        question.answer = uri

        const newOptions = [uri]

        // Build options, making sure to not take duplicate options
        for (let j = 0; j < numOptions - 1; j += 1) {
          let { uri: newOption } = vocabAudioL1[Math.floor(Math.random() * vocabAudioL1.length)]

          while (newOptions.indexOf(newOption) >= 0) {
            newOption = vocabAudioL1[Math.floor(Math.random() * vocabAudioL1.length)].uri
          }
          newOptions.push(newOption)
        }

        // Don't forget to shuffle the options
        const shuffledOptions = shuffle(newOptions)

        question.options = shuffledOptions.map((option) => ({
          uri: option,
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

  const updateOptionState = (optionURI, newState) => {
    /**
     * Updates the state of an option after a user correctly or incorrectly answers that option
     */
    const questionsCopy = _.cloneDeep(questions)

    for (
      let i = 0;
      i < questionsCopy[currentQuestionIdx].options.length;
      i += 1
    ) {
      if (questionsCopy[currentQuestionIdx].options[i].uri === optionURI) {
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

  const answerQuestion = () => {
    if (
      currentQuestionIdx < 0
      || currentQuestionIdx >= questions.length
      || questionState === QUESTION_STATE.CORRECT
      || selectedOptionIdx === -1
    ) {
      return false
    }

    const answer = questions[currentQuestionIdx].options[selectedOptionIdx].uri

    if (questions[currentQuestionIdx].answer === answer) {
      setQuestionState(QUESTION_STATE.CORRECT)
      updateOptionState(answer, QUESTION_STATE.CORRECT)

      // Delay for a bit before presenting the next question
      setTimeout(() => {
        setSelectedOptionIdx(-1)
        nextQuestion()
      }, ACTIVITY_DELAY)
    } else {
      // Mark option as incorrect and already answered
      setQuestionState(QUESTION_STATE.INCORRECT)
      updateOptionState(answer, QUESTION_STATE.INCORRECT)
      setSelectedOptionIdx(-1)
    }
    return true
  }

  const playAudio = async (uri, idx) => {
    await errorWrap(async () => {
      /* Don't play audio and mark this as an option if:
        - The user has already answered correctly and we are in the delay state
        - The user has already guessed this option and gotten it incorrect
      */
      if (
        currentQuestionIdx < 0
        || currentQuestionIdx >= questions.length
        || questionState === QUESTION_STATE.CORRECT
        || questions[currentQuestionIdx].options[idx].state
          === QUESTION_STATE.INCORRECT
      ) {
        return
      }

      // Anytime the user plays audio for a vocab item, the vocab item gets selected
      setSelectedOptionIdx(idx)

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

  const generateOptions = () => {
    if (currentQuestionIdx < 0 || currentQuestionIdx >= questions.length) {
      return null
    }

    const allOptionComponents = questions[currentQuestionIdx].options.map(
      (option, idx) => {
        let variant = 'learner_secondary'
        let iconColor = colors.blue.darker

        if (idx === selectedOptionIdx) {
          variant = 'learner_selected'
          iconColor = colors.blue.light
        } else {
          switch (option.state) {
            case QUESTION_STATE.INCORRECT:
              variant = 'learner_incorrect'
              iconColor = colors.white.medium
              break
            case QUESTION_STATE.CORRECT:
              variant = 'learner_selected'
              iconColor = colors.blue.light
              break
            case QUESTION_STATE.IN_PROGRESS:
              variant = 'learner_secondary'
              break
            default:
              break
          }
        }

        return (
          <StyledButton
            key={`${option.uri}`}
            title={`${i18n.t('dict.audio')} ${idx + 1}`}
            variant={variant}
            fontSize="18"
            rightIcon={
              <FontAwesome name="volume-up" size={25} color={iconColor} />
            }
            style={{ width: '45%', margin: 5, borderRadius: 40 }}
            onPress={() => playAudio(option.uri, idx)}
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

  const generateL1Text = () => {
    if (currentQuestionIdx < 0 || currentQuestionIdx >= questions.length) {
      return null
    }

    return (
      <Text
        fontFamily="heading"
        fontWeight="regular"
        color="blue.darker"
        fontSize={35}
      >
        {questions[currentQuestionIdx].l1}
      </Text>
    )
  }

  const generateConfirmButton = () => {
    let text = i18n.t('actions.pressAndSelect')
    let variant = 'learner_incorrect'

    if (questionState === QUESTION_STATE.CORRECT) {
      text = `${i18n.t('dict.confirm')} ${i18n.t('dict.audio')} ${
        selectedOptionIdx + 1
      }`
      variant = 'learner_correct'
    } else if (selectedOptionIdx >= 0) {
      text = `${i18n.t('dict.confirm')} ${i18n.t('dict.audio')} ${
        selectedOptionIdx + 1
      }`
      variant = 'learner_in_progress'
    }

    return (
      <StyledButton
        title={text}
        variant={variant}
        fontSize="18"
        onPress={answerQuestion}
      />
    )
  }

  return (
    <>
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
          {generateL1Text()}
          {generateFeedbackText()}
        </View>
        <View style={styles.answerContainer}>{generateOptions()}</View>
        {generateConfirmButton()}
      </View>
    </>
  )
}

// Home Base Case Object Fields
Activity2.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Activity2.defaultProps = {
  navigation: { navigate: () => null },
}

export default Activity2
