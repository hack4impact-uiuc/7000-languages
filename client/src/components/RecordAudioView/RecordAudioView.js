import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import StyledButton from 'components/StyledButton'
import { FontAwesome } from '@expo/vector-icons'
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
    paddingHorizontal: 10,
  },
  completeLeftContainer: {
    backgroundColor: colors.gray.light,
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
  confirmRecording,
  stopPlayingRecording,
}) => {
  const [seconds, setSeconds] = useState(0) // keeps track of how long the recording is in seconds
  const [isActive, setIsActive] = useState(false) // true if the user is recording
  const [playSeconds, setPlaySeconds] = useState(0) // keeps track of how long the recording is playing
  const [isPlayActive, setIsPlayActive] = useState(false) // true if the user is listening to the recording

  // resets the audio time
  function reset() {
    setSeconds(0)
    setIsActive(false)
  }

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

  const rerecord = () => {
    reset()
    setIsActive(true)
    discardRecording()
    startRecording()
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
        color={colors.red.dark}
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
          <FontAwesome name="microphone" size={30} color={colors.red.dark} />
          <Text
            fontFamily="heading"
            fontWeight="regular"
            fontStyle="normal"
            color={colors.red.dark}
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
          <FontAwesome
            name="stop-circle"
            size={35}
            color={colors.red.dark}
            onPress={stop}
          />
        </View>
      )
    case RECORDING.CONFIRMATION:
      return (
        <View style={styles.confirmationView}>
          <View style={styles.confirmationLeftContainer}>
            {generateTimeText()}
            {!isPlayActive ? (
              <FontAwesome
                name="play-circle"
                size={35}
                color={colors.black}
                onPress={play}
                style={styles.playButton}
              />
            ) : (
              <FontAwesome
                name="pause-circle"
                size={35}
                color={colors.black}
                onPress={stopPlaying}
                style={styles.playButton}
              />
            )}
          </View>
          <View style={styles.rightContainer}>
            <FontAwesome
              name="times-circle"
              size={35}
              color={colors.red.dark}
              style={styles.cancelButton}
              onPress={discardRecording}
            />
            <FontAwesome
              name="check-circle"
              size={35}
              color={colors.green.medium}
              onPress={confirmRecording}
            />
          </View>
        </View>
      )
    case RECORDING.COMPLETE:
      return (
        <View style={styles.completeView}>
          <View style={styles.completeLeftContainer}>
            {generateTimeText()}
            <View style={styles.rightContainer}>
              <FontAwesome
                name="times-circle"
                size={35}
                color={colors.red.dark}
                style={styles.cancelButton}
                onPress={discardRecording}
              />
              {!isPlayActive ? (
                <FontAwesome
                  name="play-circle"
                  size={35}
                  color={colors.black}
                  onPress={play}
                />
              ) : (
                <FontAwesome
                  name="pause-circle"
                  size={35}
                  color={colors.black}
                  onPress={stopPlaying}
                />
              )}
            </View>
          </View>
          <StyledButton
            title="Re-record"
            variant="small"
            leftIcon={(
              <FontAwesome
                name="microphone"
                size={25}
                color={colors.red.dark}
              />
            )}
            onPress={rerecord}
          />
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
  confirmRecording: PropTypes.func,
  stopPlayingRecording: PropTypes.func,
}

RecordAudioView.defaultProps = {
  recordingStage: RECORDING.IN_COMPLETE,
  startRecording: () => {},
  stopRecording: () => {},
  playRecording: () => {},
  discardRecording: () => {},
  confirmRecording: () => {},
  stopPlayingRecording: () => {},
}

export default RecordAudioView
