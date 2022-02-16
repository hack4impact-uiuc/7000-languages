import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, StatusBar } from 'react-native'
import Button from 'components/Button'
import { colors } from 'theme'
import { Text } from 'native-base'

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.gray.light,
    },
})

const Login = ({ navigation }) => {
    return (
        <View style={styles.root}>
            <StatusBar barStyle="light-content" />
            <Text
                fontWeight="regular"
                color="blue.dark"
                fontStyle="italic"
                fontSize="6xl"
            >
                Login
            </Text>
        </View>
    )
}

Login.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }),
}

Login.defaultProps = {
    navigation: { navigate: () => null },
}

export default Login
