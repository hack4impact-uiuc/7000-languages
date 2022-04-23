import React from 'react'
import PropTypes from 'prop-types'
import StyledButton from 'components/StyledButton'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { colors } from 'theme'
import { RECORDING } from 'utils/constants'
import { StyleSheet, TouchableOpacity } from 'react-native'
import {
    View, Text
} from 'native-base'

const styles = StyleSheet.create({
    incompleteView: {
        backgroundColor: colors.red.light,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        borderRadius: 10,
    },
    inProgressView: {
        backgroundColor: colors.red.light,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 45,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    recordAudioText: {
        marginLeft: 8,
    }
})

const RecordAudioView = ({ recordingStage, startRecording, stopRecording, playRecording, discardRecording, confirmRecording }) => {
    switch (recordingStage) {
        case RECORDING.INCOMPLETE:
            return (
                <TouchableOpacity style={styles.incompleteView} onPress={startRecording}>
                    <FontAwesome name="microphone" size={24} color={colors.red.dark} />
                    <Text fontFamily="heading"
                        fontWeight="regular"
                        fontStyle="normal"
                        color={colors.red.dark}
                        fontSize="md"
                        style={styles.recordAudioText}>Record Audio</Text>
                </TouchableOpacity >
            )
        case RECORDING.IN_PROGRESS:
            return (<TouchableOpacity style={styles.inProgressView} onPress={stopRecording}>
                <Text fontFamily="body"
                    fontWeight="regular"
                    fontStyle="normal"
                    color={colors.red.dark}
                    fontSize="md"
                    style={styles.recordAudioText}>00:00</Text>
                <FontAwesome name="stop-circle" size={24} color={colors.red.dark} />
            </TouchableOpacity >)
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
