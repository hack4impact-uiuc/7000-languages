import React from 'react'
import PropTypes from 'prop-types'
import { Button, Text } from 'native-base'
import { StyleSheet, View } from 'react-native'
import StyledButton from 'components/StyledButton'

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },
})

const Drawer = ({
    closeCallback
}) => (
    <View style={styles.root}>
        <Text>This is a modal!</Text>
        <StyledButton onPress={closeCallback} title="Dismiss" variant="secondary" />
    </View>
)
// Button object fields
Drawer.propTypes = {
    closeCallback: PropTypes.func
}

Drawer.defaultProps = {
    closeCallback: () => null
}

export default Drawer
