import React, { useState } from 'react'
import { colors } from 'theme'
import { Text, Input } from 'native-base'
import { StyleSheet, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useSelector } from 'react-redux'

import i18n from 'utils/i18n'
import Logo from '../../../assets/images/logo-sm-gray.svg'

const styles = StyleSheet.create({
  search: {
    marginTop: '3%',
    width: '90%',
    py: '1',
    px: '2',
    alignSelf: 'center',
    variant: 'filled',
    color: colors.blue.medium,
  },
  logo: {
    alignSelf: 'center',
  },
  cancelButton: {
    fontSize: 15,
    paddingRight: '3%',
    color: colors.blue.dark,
  },
  welcomeText: {
    color: colors.gray.medium,
  },
})

const LearnerSearch = () => {
  const [searchFocused, setSearchFocused] = useState(false)
  const { userName } = useSelector((state) => state.app)

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.search}>
        <Input
          height="25%"
          borderRadius={10}
          placeholderTextColor={colors.blue.dark}
          placeholder={i18n.t('actions.searchCourses')}
          backgroundColor={colors.blue.light}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          InputLeftElement={(
            <AntDesign
              name="search1"
              size={24}
              color={colors.blue.dark}
              style={{ paddingLeft: '3%' }}
            />
          )}
          InputRightElement={(
            <Text style={styles.cancelButton}>
              {searchFocused ? 'Cancel' : ''}
            </Text>
          )}
        />
      </View>

      <Logo style={styles.logo} width="18%" height="18%" />
      {/* Concerned about i18n on this one */}
      <Text
        style={styles.welcomeText}
        fontFamily="heading"
        fontSize="2xl"
        textAlign="center"
      >
        {i18n.t('dict.searchWelcome')}
        {userName}
        {'.'}
      </Text>
      <Text textAlign="center" fontFamily="body" color={colors.gray.medium}>
        {i18n.t('dialogue.startSearching')}
      </Text>
    </View>
  )
}

export default LearnerSearch
