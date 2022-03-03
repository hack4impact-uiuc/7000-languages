import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import StyledButton from 'components/StyledButton'
import { colors } from 'theme'
import { AntDesign } from '@expo/vector-icons'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray.light,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
})

const Details = ({ route, navigation }) => {
  const from = route?.params?.from
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>{`Details (from ${from})`}</Text>

      <StyledButton
        title="Go Back"
        leftIcon={<AntDesign name="google" size={24} color="#E9BAB6" />}
        variant="secondary"
        onPress={() => {
          navigation.navigate('Home', { from: 'Details' })
        }}
      />
    </View>
  )
}

Details.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ from: PropTypes.string }),
  }),
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
}

Details.defaultProps = {
  route: { params: { from: '' } },
  navigation: { goBack: () => null },
}

export default Details
