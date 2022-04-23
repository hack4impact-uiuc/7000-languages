import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Drawer from 'components/Drawer'
import {
  View, Input, Text, TextArea, Image,
} from 'native-base'
import StyledButton from 'components/StyledButton'
import { Entypo } from '@expo/vector-icons'
import { colors } from 'theme'
import * as ImagePicker from 'expo-image-picker'
import { StyleSheet, Alert, ImageBackground } from 'react-native'
import { Audio } from 'expo-av'
import { RECORDING } from 'utils/constants'
import RecordAudioView from 'components/RecordAudioView'

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
    justifyContent: 'center'
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
    borderRadius: 50
  },
})

const WordDrawer = ({ navigation }) => {
  /* TODO:
    1. replace original and translated useState with useSelector (Redux) code
    2. Check if there is a selected vocab in Redux. If so, populate the drawer with the vocab item data. Also add some
    marker in state that indicates whether we are using this WordDrawer to add a new vocab item or edit an existing vocab item.
  */

  const [originalLanguage] = useState('English')
  const [translatedLanguage] = useState('Spanish')

  const [originalText, setOriginalText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [additionalInformation, setAdditionalInformation] = useState('')
  const [image, setImage] = useState(null)
  const [audioRecording, setAudioRecording] = useState(null)
  const [recordingStage, setRecordingState] = useState(RECORDING.INCOMPLETE)

  /*
    Allows audio to be recorded and played back in silent mode
    Source: https://github.com/expo/expo/issues/7485
  */
  useEffect(() => {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true })
  })

  const close = () => {
    navigation.goBack()
  }

  const success = () => {
    // const vocabItem = {
    //   original: originalText,
    //   translation: translatedText,
    //   image: '',
    //   audio: '',
    //   notes: additionalInformation,
    // }
    // TODO: call either the POST 'vocab' or PATCH 'vocab' and API S3 Endpoints and go back
  }

  /**
   * The functions below are used for capturing audio and images
   */

  /* Requests audio and camera permissions */
  useEffect(() => {
    (async () => {
      await Audio.requestPermissionsAsync()
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })
    })()
  }, [])

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync(expoImageSettings)

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const takeImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchCameraAsync(expoImageSettings);

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const startRecording = async () => {
    try {
      setRecordingState(RECORDING.IN_PROGRESS)
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
    setRecordingState(RECORDING.COMPLETE)
  }

  const playRecording = async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    })
    const { sound } = await Audio.Sound.createAsync({ uri: audioRecording })
    await sound.playAsync()
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
              borderRadius: 20
            }}
          >
            <View style={styles.imageButtonContainer}>
              <Entypo name="image" size={24} color={colors.red.dark} onPress={selectImageWithRemove} />
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
      <Text>{`${translatedLanguage}*`}</Text>
      <Input
        placeholder=""
        returnKeyType="done"
        value={translatedText}
        onChangeText={(val) => setTranslatedText(val)}
      />
      <RecordAudioView recordingStage={recordingStage} />
      <Text>{`${originalLanguage}*`}</Text>
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

  return (
    <Drawer
      titleText="Add a Vocab Item"
      successText="Add Item"
      successCallback={success}
      closeCallback={close}
      body={body}
    />
  )
}

WordDrawer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }),
}

WordDrawer.defaultProps = {
  navigation: { navigate: () => null, goBack: () => null },
}

export default WordDrawer