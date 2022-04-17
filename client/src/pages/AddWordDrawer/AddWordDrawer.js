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
import { StyleSheet, Alert } from 'react-native'
import { Audio } from 'expo-av'
import { RECORDING } from 'utils/constants'

const AddWordDrawer = ({ navigation }) => {
  // TODO: replace original and translated useState with useSelector (Redux) code
  const [originalLanguage] = useState('English')
  const [translatedLanguage] = useState('Spanish')

  const [originalText, setOriginalText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [additionalInformation, setAdditionalInformation] = useState('')
  const [image, setImage] = useState(null)
  const [audioRecording, setAudioRecording] = useState(null)
  const [recordingStage, setRecordingState] = useState(RECORDING.INCOMPLETE)

  const styles = StyleSheet.create({
    imageSelectorContainer: {
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: colors.gray.medium_light,
      paddingVertical: 10,
    },
    imageButtonContainer: {
      flexDirection: 'row',
      // justifyContent: "space-between"
    },
  })

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
    // TODO: call the POST vocab and API S3 Endpoints and go back
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
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const takeImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1,
    })

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
          <Image
            source={{
              uri: image,
            }}
            alt="Image representing Vocab Item in the Translated Language"
            size="2xl"
          />
          <View style={styles.imageButtonContainer}>
            <StyledButton
              leftIcon={<Entypo name="image" size={24} color={colors.black} />}
              title="Change Image"
              variant="image_picker"
              onPress={selectImage}
              style={{ width: '50%' }}
            />
            <StyledButton
              leftIcon={<Entypo name="cross" size={24} color={colors.black} />}
              title="Remove Image"
              variant="image_picker"
              onPress={() => setImage(null)}
              style={{ width: '50%' }}
            />
          </View>
        </View>
      )
    }
    return (
      <StyledButton
        leftIcon={<Entypo name="image" size={24} color={colors.black} />}
        title="Add Image"
        variant="image_picker"
        onPress={selectImage}
        style={{ height: 100 }}
      />
    )
  }

  const generateAudioContainer = () => {
    switch (recordingStage) {
      case RECORDING.INCOMPLETE:
        return (
          <StyledButton
            title="Record Audio"
            onPress={startRecording}
            style={{ width: '100%' }}
          />
        )
      case RECORDING.IN_PROGRESS:
        return (
          <StyledButton
            title="Stop Recording"
            onPress={stopRecording}
            style={{ width: '100%' }}
          />
        )
      case RECORDING.COMPLETE:
        return (
          <>
            <StyledButton
              title="Play Audio"
              onPress={playRecording}
              style={{ width: '100%' }}
            />
            <StyledButton
              title="Re-record Audio"
              onPress={startRecording}
              style={{ width: '100%' }}
            />
            <StyledButton
              title="Remove Audio"
              onPress={clearRecording}
              style={{ width: '100%' }}
            />
          </>
        )
      default:
        return null
    }
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
      {generateAudioContainer()}
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

AddWordDrawer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }),
}

AddWordDrawer.defaultProps = {
  navigation: { navigate: () => null, goBack: () => null },
}

export default AddWordDrawer
