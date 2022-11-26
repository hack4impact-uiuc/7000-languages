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
import { getFileURI } from 'utils/cache'
import { MEDIA_TYPE, ACTIVITY_TYPE, QUESTION_STATE } from 'utils/constants'
import { Audio } from 'expo-av'
import _ from 'lodash'
import { shuffle } from 'utils/learnerHelper'

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
        width: "100%"
    },
    playAudioContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colors.blue.medium_light,
        height: 110,
        width: 110,
        borderRadius: '100%',
        margin: 20,
        shadowColor: colors.gray.darker,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    }
})

const Activity1 = ({ navigation }) => {
    const errorWrap = useErrorWrap()

    const { lessonData, currentCourseId, currentUnitId, currentLessonId } = useSelector((state) => state.language)

    const [questions, setQuestions] = useState([])
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(-1);
    const [questionState, setQuestionState] = useState(QUESTION_STATE.IN_PROGRESS)

    const allDone = () => {
        navigation.navigate('Activity', { screen: 'StartActivity', params: { activityType: ACTIVITY_TYPE.L1_AUDIO } })
    }

    useEffect(() => {
        errorWrap(
            async () => {
                // Determine how many questions and options there are
                const selectedData = lessonData.vocab.filter((item) => item.selected);
                const vocabWithAudio = selectedData.filter((vocab) => vocab.audio !== '');
                const vocabL2 = selectedData.map((vocab) => vocab.translation);

                const numOptions = Math.min(selectedData.length, 4);

                const newQuestions = []

                const shuffledVocabWithAudio = shuffle(vocabWithAudio);

                // Build each question
                for (let i = 0; i < shuffledVocabWithAudio.length; i++) {
                    let question = {
                        uri: "",
                        options: [],
                        answer: ""
                    }

                    // fetch audio URI
                    const { _id, translation, audio } = shuffledVocabWithAudio[i];

                    const { fileURI: audioUri, shouldRefresh: shouldRefreshAudio } = await getFileURI(_id, MEDIA_TYPE.AUDIO)

                    if (shouldRefreshAudio) {
                        const splitPath = audio.split('.')

                        // Get the file type from the vocabItem's audio field
                        const fileType = splitPath.length === 2 ? splitPath[1] : 'm4a'

                        // Downloads audio file and gets Filesystem uri
                        question.uri = await downloadAudioFile(
                            currentCourseId,
                            currentUnitId,
                            currentLessonId,
                            _id,
                            fileType,
                        );
                    } else {
                        question.uri = audioUri;
                    }

                    // Set correct answer
                    question.answer = translation;

                    const newOptions = [translation]

                    // Build options
                    for (let j = 0; j < numOptions - 1; j++) {
                        let newOption = vocabL2[Math.floor(Math.random() * vocabL2.length)];

                        while (newOption == translation || newOptions.indexOf(newOption) >= 0) {
                            newOption = vocabL2[Math.floor(Math.random() * vocabL2.length)];
                        }
                        newOptions.push(newOption);
                    }

                    // Don't forget to shuffle the options
                    const shuffledOptions = shuffle(newOptions);

                    question.options = shuffledOptions.map((option) => ({ text: option, state: QUESTION_STATE.IN_PROGRESS }));
                    newQuestions.push(question);
                }

                if (newQuestions.length == 0) {
                    allDone();
                } else {
                    setQuestions(newQuestions);
                    setCurrentQuestionIdx(0);
                }
            })
    }, [lessonData, currentCourseId, currentUnitId, currentLessonId])

    const updateOptionState = (optionText, newState) => {
        const questionsCopy = _.cloneDeep(questions);

        for (let i = 0; i < questionsCopy[currentQuestionIdx].options.length; i++) {
            if (questionsCopy[currentQuestionIdx].options[i].text === optionText) {
                questionsCopy[currentQuestionIdx].options[i].state = newState;
                break;
            }
        }

        setQuestions(questionsCopy);
    }

    const nextQuestion = () => {
        if (currentQuestionIdx + 1 >= questions.length) {
            allDone();
        } else {
            setQuestionState(QUESTION_STATE.IN_PROGRESS);
            setCurrentQuestionIdx(currentQuestionIdx + 1);
        }
    }

    const answerQuestion = (answer) => {
        if (currentQuestionIdx < 0 || currentQuestionIdx >= questions.length || questionState == QUESTION_STATE.CORRECT) {
            return null;
        }

        if (questions[currentQuestionIdx].answer === answer) {
            setQuestionState(QUESTION_STATE.CORRECT);
            updateOptionState(answer, QUESTION_STATE.CORRECT)

            setTimeout(() => {
                nextQuestion();
            }, 1500);
        } else {
            // Mark option as incorrect and already answered
            setQuestionState(QUESTION_STATE.INCORRECT);
            updateOptionState(answer, QUESTION_STATE.INCORRECT)
        }
    }

    const generateOptions = () => {
        if (currentQuestionIdx < 0 || currentQuestionIdx >= questions.length) {
            return null;
        }

        const allOptionComponents = questions[currentQuestionIdx].options.map((option, idx) => {
            let variant = 'learner_in_progress';
            switch (option.state) {
                case QUESTION_STATE.INCORRECT:
                    variant = 'learner_incorrect';
                    break;
                case QUESTION_STATE.CORRECT:
                    variant = 'learner_correct';
                    break;
                case QUESTION_STATE.IN_PROGRESS:
                    variant = 'learner_in_progress';
                    break;
                default:
                    break;
            }
            return <StyledButton
                key={`${option.text}-${idx}`}
                title={option.text}
                variant={variant}
                fontSize="20"
                shadow
                onPress={() => answerQuestion(option.text)}
            />
        })

        return allOptionComponents;
    }

    const generateFeedbackText = () => {
        switch (questionState) {
            case QUESTION_STATE.INCORRECT:
                return <Text
                    fontFamily="heading"
                    fontWeight="regular"
                    color="orange.medium_dark"
                    fontSize="2xl"
                >
                    {i18n.t('actions.tryAgain')}
                </Text>
            case QUESTION_STATE.CORRECT:
                return <Text
                    fontFamily="heading"
                    fontWeight="regular"
                    color="green.medium_light"
                    fontSize="2xl"
                >
                    {i18n.t('actions.correct')}
                </Text>
            case QUESTION_STATE.IN_PROGRESS:
                return null
            default:
                return null
        }
    }

    const playAudio = async () => {
        await errorWrap(async () => {
            if (currentQuestionIdx < 0 || currentQuestionIdx >= questions.length || questionState == QUESTION_STATE.CORRECT) {
                return;
            }

            const uri = questions[currentQuestionIdx].uri;

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
                fontSize="lg">{currentQuestionIdx + 1}/{questions.length}</Text>
            <TouchableOpacity style={styles.playAudioContainer} onPress={playAudio}>
                <FontAwesome name="volume-up" size={45} color={colors.blue.darker} />
            </TouchableOpacity>
            {generateFeedbackText()}
            <View style={styles.answerContainer}>
                {generateOptions()}
            </View>
        </View>
    )
}

// Home Base Case Object Fields
Activity1.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    })
}

Activity1.defaultProps = {
    navigation: { navigate: () => null },
}

export default Activity1
