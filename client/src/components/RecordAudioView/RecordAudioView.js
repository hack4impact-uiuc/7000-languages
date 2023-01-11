import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { colors } from 'theme'
import { RECORDING } from 'utils/constants'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { View, Text } from 'native-base'
import i18n from 'utils/i18n'

const styles = StyleSheet.create({
  incompleteView: {
    backgroundColor: colors.red.light,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
  },
  inProgressView: {
    backgroundColor: colors.red.light,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  confirmationView: {
    backgroundColor: colors.red.light,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  confirmationLeftContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexGrow: 1,
  },
  recordAudioText: {
    marginLeft: 8,
  },
  cancelButton: {
    marginRight: 8,
  },
  playButton: {
    marginLeft: 10,
  },
  completeView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    borderRadius: 10,
  },
  completeRightContainer: {
    backgroundColor: colors.gray.medium_darker,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
})

const RecordAudioView = ({
  recordingStage,
  startRecording,
  stopRecording,
  playRecording,
  discardRecording,
  stopPlayingRecording,
  recordingSeconds,
}) => {
  const [seconds, setSeconds] = useState(recordingSeconds) // keeps track of how long the recording is in seconds
  const [isActive, setIsActive] = useState(false) // true if the user is recording
  const [playSeconds, setPlaySeconds] = useState(0) // keeps track of how long the recording is playing
  const [isPlayActive, setIsPlayActive] = useState(false) // true if the user is listening to the recording

  // resets the audio time
  function reset() {
    setSeconds(0)
    setIsActive(false)
  }

  useEffect(() => {
    setSeconds(recordingSeconds)
  }, [recordingSeconds])

  // Updates the timer for keeping track of recording length
  useEffect(() => {
    let interval = null
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((timerSeconds) => timerSeconds + 1)
      }, 1000)
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval) // clear to prevent memory leaks
    }
    return () => clearInterval(interval)
  }, [isActive, seconds])

  // Updates the timer for keeping track of listening time
  useEffect(() => {
    let interval = null
    if ((!isPlayActive && seconds !== 0) || playSeconds === seconds + 1) {
      // stop recording when we have reached the end
      setIsPlayActive(false)
      clearInterval(interval) // clear to prevent memory leaks
      setPlaySeconds(0)
    } else if (isPlayActive) {
      interval = setInterval(() => {
        setPlaySeconds((timerSeconds) => timerSeconds + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlayActive, playSeconds, setIsActive, setPlaySeconds])

  const start = () => {
    reset()
    setIsActive(true)
    startRecording()
  }

  const stop = () => {
    setIsActive(false)
    stopRecording()
  }

  const play = () => {
    setIsPlayActive(true)
    playRecording()
  }

  const stopPlaying = () => {
    setIsPlayActive(false)
    stopPlayingRecording()
  }

  /**
   * Cleans up a number to be presented as a part of the timer
   */
  const addZeroToNum = (num) => {
    const floored = Math.floor(num)
    if (floored < 10) {
      return `0${floored}`
    }
    return floored
  }

  /**
   * Generates the text that shows the length of the recording in minutes and seconds
   */
  const generateTimeText = () => {
    const secondsToDisplay = isPlayActive ? playSeconds : seconds

    return (
      <Text
        fontFamily="body"
        fontWeight="regular"
        fontStyle="normal"
        color={
          recordingStage === RECORDING.IN_PROGRESS
            ? colors.red.medium_dark
            : colors.gray.dark
        }
        fontSize="2xl"
        style={styles.recordAudioText}
      >
        {addZeroToNum(secondsToDisplay / 60)}:
        {addZeroToNum(secondsToDisplay % 60)}
      </Text>
    )
  }

  switch (recordingStage) {
    case RECORDING.INCOMPLETE:
      return (
        <TouchableOpacity style={styles.incompleteView} onPress={start}>
          <FontAwesome
            name="microphone"
            size={30}
            color={colors.red.medium_dark}
          />
          <Text
            fontFamily="heading"
            fontWeight="regular"
            fontStyle="normal"
            color={colors.red.medium_dark}
            fontSize="xl"
            style={styles.recordAudioText}
          >
            {i18n.t('actions.recordAudio')}
          </Text>
        </TouchableOpacity>
      )
    case RECORDING.IN_PROGRESS:
      return (
        <View style={styles.inProgressView}>
          {generateTimeText()}
          <MaterialCommunityIcons
            name="stop-circle"
            size={35}
            color={colors.red.medium_dark}
            onPress={stop}
          />
        </View>
      )
    case RECORDING.COMPLETE:
      return (
        <View style={styles.completeView}>
          <MaterialCommunityIcons
            name="trash-can"
            color={colors.red.medium_dark}
            size={35}
            onPress={discardRecording}
            style={{ paddingRight: 10 }}
          />
          <View style={styles.completeRightContainer}>
            {generateTimeText()}
            <View style={styles.rightContainer}>
              {!isPlayActive ? (
                <MaterialCommunityIcons
                  name="play-circle"
                  size={35}
                  color={colors.gray.dark}
                  onPress={play}
                />
              ) : (
                <MaterialCommunityIcons
                  name="pause-circle"
                  size={35}
                  color={colors.gray.dark}
                  onPress={stopPlaying}
                />
              )}
            </View>
          </View>
        </View>
      )
    default:
      return null
  }
}

// Button object fields
RecordAudioView.propTypes = {
  recordingStage: PropTypes.number,
  startRecording: PropTypes.func,
  stopRecording: PropTypes.func,
  playRecording: PropTypes.func,
  discardRecording: PropTypes.func,
  stopPlayingRecording: PropTypes.func,
  recordingSeconds: PropTypes.number,
}

RecordAudioView.defaultProps = {
  recordingStage: RECORDING.IN_COMPLETE,
  startRecording: () => {},
  stopRecording: () => {},
  playRecording: () => {},
  discardRecording: () => {},
  stopPlayingRecording: () => {},
  recordingSeconds: 10,
}

export default RecordAudioView
