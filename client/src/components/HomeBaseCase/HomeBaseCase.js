import React from 'react'
import StyledButton from 'components/StyledButton'
import { colors } from 'theme'
import { Text } from 'native-base'
import { StyleSheet, View, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import { AntDesign } from '@expo/vector-icons'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white.dark,
  },
})
const HomeBaseCase = ({ navigation }) => (
  <View style={styles.root}>
    <StatusBar barStyle="light-content" />
    <Text
      fontFamily="heading"
      fontWeight="regular"
      fontStyle="normal"
      color="gray.medium"
      fontSize="xl"
    >
      Welcome!
    </Text>
    <Text
      color="gray.medium"
      fontSize="xl"
      textAlign="center"
      paddingBottom="10px"
    >
      {`Looks like you aren't a learner in
any courses yet.`}
    </Text>
    <StyledButton
      title="Search Courses"
      leftIcon={
        <AntDesign name="search1" size={24} color={colors.white.dark} />
      }
      variant="primary_short"
    />
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          marginTop: '8%',
          marginBottom: '8%',
          height: 1,
          backgroundColor: '#C0C0C0',
          width: '65%',
        }}
      />
    </View>
    <Text
      color="gray.medium"
      fontSize="xl"
      textAlign="center"
      paddingBottom="10px"
      marginX="20px"
    >
      Our mission is to help communities teach, learn, and sustain their
      endangered languages.
      <Text fontFamily="heading" fontWeight="regular" fontStyle="normal">
        {' '}
        We’d love to support your revitalization efforts.
      </Text>
    </Text>
    <Text
      fontFamily="heading"
      fontWeight="regular"
      fontStyle="normal"
      paddingTop="8%"
      paddingBottom="10%"
      color="red.dark"
      fontSize="2xl"
      onPress={() => {
        navigation.navigate('Apply', { from: 'HomeBaseCase' })
      }}
    >
      Become a contributor
    </Text>
  </View>
)

// Home Base Case Object Fields
HomeBaseCase.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

HomeBaseCase.defaultProps = {
  navigation: { navigate: () => null },
}

export default HomeBaseCase
