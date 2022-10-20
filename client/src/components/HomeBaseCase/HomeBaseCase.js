import React from 'react'
import StyledButton from 'components/StyledButton'
import { colors } from 'theme'
import { Text } from 'native-base'
import { StyleSheet, View, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import { AntDesign } from '@expo/vector-icons'
import i18n from 'utils/LanguageData'

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
      {i18n.t('dict.welcome')}
    </Text>
    <Text
      color="gray.medium"
      fontSize="xl"
      textAlign="center"
      paddingBottom="10px"
    >
      {i18n.t('dialogue.notLearnerPrompt')}
    </Text>
    <StyledButton
      title={i18n.t('actions.searchCourses')}
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
      {i18n.t('dialogue.ourMission')}
      <Text fontFamily="heading" fontWeight="regular" fontStyle="normal">
        {i18n.t('dialogue.supportRevitalization')}
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
      {i18n.t('actions.becomeContributor')}
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
