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
import { MEDIA_TYPE, QUESTION_STATE } from 'utils/constants'
import { Audio } from 'expo-av'
import _ from 'lodash'
import { shuffle } from 'utils/learnerHelper'

const styles = StyleSheet.create({
    root: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        textAlign: 'center'
    },
    answerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
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

const Activity2 = ({ navigation }) => {
    const errorWrap = useErrorWrap()

    const { lessonData, currentCourseId, currentUnitId, currentLessonId } = useSelector((state) => state.language)

    const [questions, setQuestions] = useState([])
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(-1);
    const [questionState, setQuestionState] = useState(QUESTION_STATE.IN_PROGRESS)
    const [selectedOptionIdx, setSelectedOptionIdx] = useState(-1);

    const allDone = () => {
        navigation.navigate("Drawer", { screen: 'LearnerHome' });
    }

    useEffect(() => {
        errorWrap(
            async () => {
                // Determine how many questions and options there are
                const selectedData = lessonData.vocab.filter((item) => item.selected);
                const vocabWithAudio = selectedData.filter((vocab) => vocab.audio !== '');
                const vocabAudio = vocabWithAudio.filter((vocab) => vocab.audio);
                const numOptions = Math.min(vocabWithAudio.length, 4);

                const vocabAudioL1 = []

                // Gather the audio uris for all of the vocab with audio
                for (let i = 0; i < vocabAudio.length; i++) {
                    const { _id, original } = vocabAudio[i];
                    const { fileURI: audioUri, shouldRefresh: shouldRefreshAudio } = await getFileURI(_id, MEDIA_TYPE.AUDIO)

                    let data = {
                        l1: original,
                        uri: ""
                    }

                    if (shouldRefreshAudio) {
                        const splitPath = audio.split('.')

                        // Get the file type from the vocabItem's audio field
                        const fileType = splitPath.length === 2 ? splitPath[1] : 'm4a'

                        // Downloads audio file and gets Filesystem uri
                        data.uri = await downloadAudioFile(
                            currentCourseId,
                            currentUnitId,
                            currentLessonId,
                            _id,
                            fileType,
                        );
                    } else {
                        data.uri = audioUri;
                    }

                    vocabAudioL1.push(data);
                }


                const newQuestions = [];
                const shuffledVocabWithAudio = shuffle(vocabAudioL1);

                // Build each question
                for (let i = 0; i < shuffledVocabWithAudio.length; i++) {
                    let question = {
                        l1: "",
                        options: [],
                        answer: ""
                    }

                    // fetch audio URI
                    const { l1, uri } = shuffledVocabWithAudio[i];

                    // Set correct answer
                    question.l1 = l1;
                    question.answer = uri;

                    const newOptions = [uri]

                    // Build options
                    for (let j = 0; j < numOptions - 1; j++) {
                        let { uri: newOption } = vocabAudioL1[Math.floor(Math.random() * vocabAudioL1.length)];

                        while (newOption == uri || newOptions.indexOf(newOption) >= 0) {
                            newOption = vocabAudioL1[Math.floor(Math.random() * vocabAudioL1.length)].uri;
                        }
                        newOptions.push(newOption);
                    }

                    // Don't forget to shuffle the options
                    const shuffledOptions = shuffle(newOptions);

                    question.options = shuffledOptions.map((option) => ({ uri: option, state: QUESTION_STATE.IN_PROGRESS }));
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

    const updateOptionState = (optionURI, newState) => {
        const questionsCopy = _.cloneDeep(questions);

        for (let i = 0; i < questionsCopy[currentQuestionIdx].options.length; i++) {
            if (questionsCopy[currentQuestionIdx].options[i].uri === optionURI) {
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

    const answerQuestion = () => {
        if (currentQuestionIdx < 0 || currentQuestionIdx >= questions.length || questionState == QUESTION_STATE.CORRECT || selectedOptionIdx == -1) {
            return null;
        }

        const answer = questions[currentQuestionIdx].options[selectedOptionIdx].uri;

        if (questions[currentQuestionIdx].answer === answer) {
            setQuestionState(QUESTION_STATE.CORRECT);
            updateOptionState(answer, QUESTION_STATE.CORRECT);

            setTimeout(() => {
                setSelectedOptionIdx(-1);
                nextQuestion();
            }, 1500);
        } else {
            // Mark option as incorrect and already answered
            setQuestionState(QUESTION_STATE.INCORRECT);
            updateOptionState(answer, QUESTION_STATE.INCORRECT);
            setSelectedOptionIdx(-1);
        }
    }

    const playAudio = async (uri, idx) => {
        await errorWrap(async () => {
            if (currentQuestionIdx < 0 || currentQuestionIdx >= questions.length || questionState == QUESTION_STATE.CORRECT) {
                return;
            } else if (questions[currentQuestionIdx].options[idx].state === QUESTION_STATE.INCORRECT) {
                return;
            }

            setSelectedOptionIdx(idx);

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
            return null;
        }

        const allOptionComponents = questions[currentQuestionIdx].options.map((option, idx) => {
            let variant = 'learner_secondary';
            let iconColor = colors.blue.darker;

            if (idx === selectedOptionIdx) {
                variant = 'learner_selected'
                iconColor = colors.blue.light;
            } else {
                switch (option.state) {
                    case QUESTION_STATE.INCORRECT:
                        variant = 'learner_incorrect';
                        iconColor = colors.white.medium;
                        break;
                    case QUESTION_STATE.CORRECT:
                        variant = 'learner_selected'
                        iconColor = colors.blue.light;
                        break;
                    case QUESTION_STATE.IN_PROGRESS:
                        variant = 'learner_secondary';
                        break;
                    default:
                        break;
                }
            }

            return (<StyledButton
                key={`${option.uri}-${idx}`}
                title={`${i18n.t('dict.audio')} ${idx + 1}`}
                variant={variant}
                fontSize="18"
                rightIcon={
                    <FontAwesome name="volume-up" size={25} color={iconColor} />
                }
                style={{ width: "45%", margin: 5, borderRadius: 40 }}
                onPress={() => playAudio(option.uri, idx)}
            />)
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

    const generateL1Text = () => {
        if (currentQuestionIdx < 0 || currentQuestionIdx >= questions.length) {
            return null;
        }

        return <Text
            fontFamily="heading"
            fontWeight="regular"
            color="blue.darker"
            fontSize={35}>{questions[currentQuestionIdx].l1}</Text>
    }

    const generateConfirmButton = () => {
        let text = i18n.t('actions.pressAndSelect');
        let variant = "learner_incorrect"

        if (questionState === QUESTION_STATE.CORRECT) {
            text = `${i18n.t('dict.confirm')} ${i18n.t('dict.audio')} ${selectedOptionIdx + 1}`;
            variant = "learner_correct"
        } else if (selectedOptionIdx >= 0) {
            text = `${i18n.t('dict.confirm')} ${i18n.t('dict.audio')} ${selectedOptionIdx + 1}`;
            variant = "learner_in_progress"
        }

        return (<StyledButton
            title={text}
            variant={variant}
            fontSize="18"
            onPress={answerQuestion}
        />)
    }

    return (
        <View style={styles.root}>
            <Text
                fontFamily="heading"
                fontWeight="regular"
                color="gray.dark"
                fontStyle="italic"
                fontSize="lg">{currentQuestionIdx + 1}/{questions.length}</Text>
            {generateL1Text()}
            {generateFeedbackText()}
            <View style={styles.answerContainer}>
                {generateOptions()}
            </View>
            {generateConfirmButton()}
        </View>
    )
}

// Home Base Case Object Fields
Activity2.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    })
}

Activity2.defaultProps = {
    navigation: { navigate: () => null },
}

export default Activity2
