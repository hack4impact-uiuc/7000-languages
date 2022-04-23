import React from 'react'
import PropTypes from 'prop-types'
import StyledButton from 'components/StyledButton'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { colors } from 'theme'
import { RECORDING } from 'utils/constants'
import { StyleSheet } from 'react-native'
import {
    View, Text
} from 'native-base'

const styles = StyleSheet.create({
    root: {
        backgroundColor: colors.red.light,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderRadius: 10,
    }
})

const RecordAudioView = ({ recordingStage, startRecording, stopRecording, playRecording, discardRecording, confirmRecording }) => {
    switch (recordingStage) {
        case RECORDING.INCOMPLETE:
            return (
                <View style={styles.root}>
                    <FontAwesome name="microphone" size={24} color={colors.red.dark} />
                    <Text>Record Audio</Text>
                </View>
            )
        case RECORDING.IN_PROGRESS:
            return null
        case RECORDING.CONFIRMATION:
            return null
        case RECORDING.COMPLETE:
            return null
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
}

RecordAudioView.defaultProps = {
    recordingStage: RECORDING.IN_COMPLETE,
    startRecording: () => { },
    stopRecording: () => { },
    playRecording: () => { },
    discardRecording: () => { },
    confirmRecording: () => { },
}

export default RecordAudioView
