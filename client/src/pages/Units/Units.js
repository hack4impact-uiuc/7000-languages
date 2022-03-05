import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, StatusBar } from 'react-native'
import StyledButton from 'components/StyledButton'
import { colors } from 'theme'
import { Box, Text } from 'native-base'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray.light,
  },
})

const Units = ({ navigation }) => (
  <View style={styles.root}>
    <StatusBar barStyle="light-content" />
    <Text
      fontWeight="regular"
      color="blue.dark"
      fontStyle="italic"
      fontSize="6xl"
    >
      Home
    </Text>
    <Text fontSize="6xl">Loading data...</Text>
    <StyledButton
      title="Primary Button"
      variant="primary"
      onPress={() => {
        navigation.navigate('Details', { from: 'Units' })
      }}
    />

    <StyledButton
      title="Continue with Google"
      variant="secondary"
      onPress={() => {
        navigation.navigate('Details', { from: 'Units' })
      }}
    />

    <StyledButton
      title="Tertiary Button"
      variant="tertiary"
      onPress={() => {
        navigation.navigate('Details', { from: 'Units' })
      }}
    />

    <Box>ghghghgh</Box>
  </View>
)

Units.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Units.defaultProps = {
  navigation: { navigate: () => null },
}

export default Units