import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Drawer from 'components/Drawer'
import { View, Input, Text, TextArea } from 'native-base'
import StyledButton from 'components/StyledButton'
import { Entypo } from '@expo/vector-icons'
import { colors } from 'theme'
import * as ImagePicker from 'expo-image-picker'
import { StyleSheet, Alert, ImageBackground } from 'react-native'
import { Audio } from 'expo-av'
import { RECORDING } from 'utils/constants'
import RecordAudioView from 'components/RecordAudioView'
import { useSelector, useDispatch } from 'react-redux' // import at the top of the file
import { addVocab, updateVocab } from 'slices/language.slice'

import {
  createVocabItem,
  updateVocabItem,
  uploadAudioFile,
  uploadImageFile,
  downloadAudioFile,
  downloadImageFile,
} from 'api'

import { useErrorWrap, useTrackPromise } from 'hooks'
import RequiredField from 'components/RequiredField'

const expoImageSettings = {
  mediaTypes: ImagePicker.MediaTypeOptions.All,
  allowsMultipleSelection: false,
  aspect: [16, 9],
  quality: 1,
}

const styles = StyleSheet.create({
  imageSelectorContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: 10,
    justifyContent: 'center',
  },
  imageButtonContainer: {
    position: 'absolute',
    bottom: -20,
    right: -20,
    flexDirection: 'row',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red.light,
    borderRadius: 50,
  },
})

const VocabDrawer = ({ navigation }) => {
  const errorWrap = useErrorWrap()
  const dispatch = useDispatch()
  const trackPromise = useTrackPromise()

  const {
    currentCourseId,
    currentUnitId,
    currentLessonId,
    currentVocabId,
    courseDetails,
    lessonData,
  } = useSelector((state) => state.language)

  const [originalLanguage] = useState(courseDetails.translated_language)
  const [translatedLanguage] = useState(courseDetails.name)

  const [originalText, setOriginalText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [additionalInformation, setAdditionalInformation] = useState('')
  const [image, setImage] = useState(null) // stores image uri
  const [audioRecording, setAudioRecording] = useState(null) // stores audio recording uri
  const [recordingStage, setRecordingState] = useState(RECORDING.INCOMPLETE) // which recording stage the user is at
  const [listeningSound, setListeningSound] = useState(null) // the data for the recording when the user is listening to it

  useEffect(() => {
    const setData = async () => {
      const index = lessonData.vocab.findIndex(
        (element) => element._id === currentVocabId,
      )

      if (index >= 0) {
        const vocabItem = lessonData.vocab[index]
        setOriginalText(vocabItem.original)
        setTranslatedText(vocabItem.translation)
        setAdditionalInformation(vocabItem.notes)

        // Check if the audio has already been fetched
        if (vocabItem.audioURI) {
          setAudioRecording(vocabItem.audioURI)
        } else if (vocabItem.audio !== '') {
          const filePath = vocabItem.audio
          const splitPath = filePath.split('.')

          // Get the file type from the vocabItem's audio field
          let fileType = 'm4a'

          if (splitPath.length === 2) {
            // eslint-disable-next-line prefer-destructuring
            fileType = splitPath[1]
          }

          // Downloads audio file and gets Filesystem uri
          const uri = await trackPromise(
            downloadAudioFile(
              currentCourseId,
              currentUnitId,
              currentLessonId,
              currentVocabId,
              fileType,
            ),
          )

          setAudioRecording(uri)
          setRecordingState(RECORDING.COMPLETE)
        }

        // Check if the audio has already been fetched
        if (vocabItem.imageURI) {
          setImage(vocabItem.imageURI)
        } else if (vocabItem.image !== '') {
          const filePath = vocabItem.image
          const splitPath = filePath.split('.')

          // Get the file type from the vocabItem's audio field
          let fileType = 'jpg'

          if (splitPath.length === 2) {
            // eslint-disable-next-line prefer-destructuring
            fileType = splitPath[1]
          }

          // Downloads audio file and gets Filesystem uri
          const uri = await trackPromise(
            downloadImageFile(
              currentCourseId,
              currentUnitId,
              currentLessonId,
              currentVocabId,
              fileType,
            ),
          )

          setImage(uri)
        }
      }
    }

    setData()
  }, [currentVocabId, lessonData])

  /*
    Allows audio to be recorded and played back in silent mode
    Source: https://github.com/expo/expo/issues/7485
  */
  useEffect(() => {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true })
  })

  /**
   * Closes the modal
   */
  const close = () => {
    navigation.goBack()
  }

  /**
   * Either updates the vocab item or creates a new vocab item
   */
  const success = async () => {
    errorWrap(
      async () => {
        let updatedVocabItem = null
        if (currentVocabId === '') {
          const vocabItem = {
            original: originalText,
            translation: translatedText,
            image: '',
            audio: '',
            notes: additionalInformation,
          }

          // Need to create a new vocab item
          const vocabItemResponse = await createVocabItem(
            currentCourseId,
            currentLessonId,
            vocabItem,
          )

          updatedVocabItem = vocabItemResponse.result

          // Push audio recording
          if (audioRecording && recordingStage === RECORDING.COMPLETE) {
            const audioResponse = await trackPromise(
              uploadAudioFile(
                currentCourseId,
                currentUnitId,
                currentLessonId,
                updatedVocabItem._id,
                audioRecording,
              ),
            )
            updatedVocabItem = audioResponse.result
          }

          if (image) {
            const imageResponse = await trackPromise(
              uploadImageFile(
                currentCourseId,
                currentUnitId,
                currentLessonId,
                updatedVocabItem._id,
                image,
              ),
            )
            updatedVocabItem = imageResponse.result
          }

          // Update vocab item in Redux store
          dispatch(addVocab({ vocab: updatedVocabItem }))
        } else {
          const vocabItem = {
            original: originalText,
            translation: translatedText,
            notes: additionalInformation,
          }

          // Updated vocab item text
          const vocabItemResponse = await updateVocabItem(
            currentCourseId,
            currentLessonId,
            currentVocabId,
            vocabItem,
          )
          updatedVocabItem = vocabItemResponse.result

          // Push audio recording
          if (audioRecording && recordingStage === RECORDING.COMPLETE) {
            const audioResponse = await trackPromise(
              uploadAudioFile(
                currentCourseId,
                currentUnitId,
                currentLessonId,
                currentVocabId,
                audioRecording,
              ),
            )

            updatedVocabItem = audioResponse.result
          }

          if (image) {
            const imageResponse = await trackPromise(
              uploadImageFile(
                currentCourseId,
                currentUnitId,
                currentLessonId,
                currentVocabId,
                image,
              ),
            )

            updatedVocabItem = imageResponse.result
          }
          // Update vocab item in Redux store
          dispatch(updateVocab({ vocab: updatedVocabItem }))
        }
      },
      () => {
        close() // on success, close the modal
      },
    )
  }

  /**
   * The functions below are used for capturing audio and images
   */

  /* Requests audio and camera permissions */
  useEffect(() => {
    ;(async () => {
      await Audio.requestPermissionsAsync()
      await ImagePicker.requestCameraPermissionsAsync()
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })
    })()
  }, [])

  /* Always unload the Sound after using it to prevent memory leaks. */
  React.useEffect(
    () =>
      listeningSound
        ? () => {
            listeningSound.unloadAsync()
          }
        : undefined,
    [listeningSound],
  )

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync(expoImageSettings)

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const takeImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchCameraAsync(expoImageSettings)

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const startRecording = async () => {
    try {
      setRecordingState(RECORDING.IN_PROGRESS)
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
      )
      setAudioRecording(recording)
    } catch (err) {
      console.error('Failed to start recording', err)
    }
  }

  /* Selecting an image using Expo */
  const selectImage = async () => {
    Alert.alert('Capture a New Image', '', [
      {
        text: 'Select from Picture Library',
        onPress: () => {
          pickImage()
        },
      },
      {
        text: 'Take with Camera',
        onPress: () => {
          takeImage()
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ])
  }

  const selectImageWithRemove = async () => {
    Alert.alert('Update Image', '', [
      {
        text: 'Select from Picture Library',
        onPress: () => {
          pickImage()
        },
      },
      {
        text: 'Take with Camera',
        onPress: () => {
          takeImage()
        },
      },
      {
        text: 'Remove Image',
        onPress: () => setImage(null),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ])
  }

  const stopRecording = async () => {
    setAudioRecording(undefined)
    await audioRecording.stopAndUnloadAsync()
    const uri = audioRecording.getURI()
    setAudioRecording(uri)
    setRecordingState(RECORDING.CONFIRMATION)
  }

  const confirmRecording = () => {
    setRecordingState(RECORDING.COMPLETE)
  }

  const playRecording = async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    })
    const { sound } = await Audio.Sound.createAsync({ uri: audioRecording })
    setListeningSound(sound)
    await sound.playAsync()
  }

  const stopPlayingRecording = async () => {
    if (listeningSound) {
      await listeningSound.unloadAsync()
    }
  }

  const clearRecording = () => {
    setAudioRecording(null)
    setRecordingState(RECORDING.INCOMPLETE)
  }

  /*
    Generates the containers for selecting images and recording audio
  */
  const generateImageContainer = () => {
    if (image) {
      return (
        <View style={styles.imageSelectorContainer}>
          <ImageBackground
            source={{
              uri: image,
            }}
            imageStyle={{ borderRadius: 10 }}
            style={{
              width: 200,
              height: 200,
              borderRadius: 20,
            }}
          >
            <View style={styles.imageButtonContainer}>
              <Entypo
                name="image"
                size={24}
                color={colors.red.dark}
                onPress={selectImageWithRemove}
              />
            </View>
          </ImageBackground>
        </View>
      )
    }
    return (
      <StyledButton
        leftIcon={<Entypo name="image" size={24} color={colors.red.dark} />}
        title="Add Image"
        variant="image_picker"
        onPress={selectImage}
        style={{ height: 100 }}
      />
    )
  }

  const body = (
    <>
      <Text color="gray.medium">A vocab item can be a word or phrase.</Text>
      {generateImageContainer()}
      <RequiredField title={translatedLanguage} />
      <Input
        placeholder=""
        returnKeyType="done"
        value={translatedText}
        onChangeText={(val) => setTranslatedText(val)}
      />
      <RecordAudioView
        recordingStage={recordingStage}
        startRecording={startRecording}
        stopRecording={stopRecording}
        playRecording={playRecording}
        confirmRecording={confirmRecording}
        discardRecording={clearRecording}
        stopPlayingRecording={stopPlayingRecording}
      />
      <RequiredField title={originalLanguage} />
      <Input
        placeholder=""
        returnKeyType="done"
        value={originalText}
        onChangeText={(val) => setOriginalText(val)}
      />
      <Text>Additional Information</Text>
      <TextArea
        size="2xl"
        h={40}
        variant="filled"
        placeholder=""
        keyboardType="default"
        returnKeyType="done"
        blurOnSubmit
        value={additionalInformation}
        onChangeText={(val) => setAdditionalInformation(val)}
      />
      <Text fontSize="sm" color="gray.medium">
        Use this space to give additional information about the vocab item, such
        as grammatical and cultural information, usage, or additional
        translations/meanings.
      </Text>
    </>
  )

  // requires the user to fill out all the fields for the vocab item
  // otherwise, the button will be disabled
  const areRequiredFieldsFilled = originalText !== '' && translatedText !== '';
  return (
    <Drawer
      titleText={currentVocabId !== '' ? 'Edit Vocab Item' : 'Add a Vocab Item'}
      successText={currentVocabId !== '' ? 'Save Changes' : 'Add Item'}
      successCallback={success}
      closeCallback={close}
      isDisabled={!areRequiredFieldsFilled}
      body={body}
    />
  )
}

VocabDrawer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }),
}

VocabDrawer.defaultProps = {
  navigation: { navigate: () => null, goBack: () => null },
}

export default VocabDrawer
