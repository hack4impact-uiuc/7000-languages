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
    backgroundColor: colors.gray.light,
  },
})
const HomeBaseCase = ({ navigation }) => (
  <View style={styles.root}>
    <StatusBar barStyle="light-content" />
    <Text
      style={{
        fontFamily: 'GT_Haptik_bold',
      }}
      fontWeight="regular"
      color="gray.medium"
      fontSize="xl"
    >
      Uh, Oh!
    </Text>
    <Text
      fontWeight="regular"
      color="gray.medium"
      fontSize="xl"
      textAlign="center"
      paddingBottom="10px"
    >
      {`Looks like you aren't a student in
any courses yet!`}
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
      fontWeight="regular"
      color="gray.medium"
      fontSize="xl"
      textAlign="center"
      paddingBottom="10px"
      marginX="20px"
    >
      Our mission is to help communities teach, learn, and sustain their
      endangered languages.
      <Text
        style={{
          fontFamily: 'GT_Haptik_bold',
        }}
      >
        {' '}
        We’d love to support your revitalization efforts.
      </Text>
    </Text>
    <Text
      style={{
        fontFamily: 'GT_Haptik_bold',
      }}
      fontWeight="regular"
      fontStyle="normal"
      paddingTop="8%"
      paddingBottom="10%"
      color="red.dark"
      fontSize="2xl"
    >
      Become a contributor
    </Text>

    <StyledButton
      title="Unit Drawer"
      variant="primary"
      onPress={() => {
        navigation.navigate('Modal', { screen: 'UnitDrawer' })
      }}
    />
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
