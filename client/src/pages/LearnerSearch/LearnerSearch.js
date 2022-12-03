import React, { useState } from 'react'
import { colors } from 'theme'
import { Text, Input, ScrollView } from 'native-base'
import { StyleSheet, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import SearchResultCard from 'components/SearchResultCard'
import StyledButton from 'components/StyledButton'

import i18n from 'utils/i18n'
import Logo from '../../../assets/images/logo-sm-gray.svg'

const styles = StyleSheet.create({
  search: {
    marginVertical: '3%',
    width: '90%',
    py: '1',
    px: '2',
    alignSelf: 'center',
    variant: 'filled',
    color: colors.blue.medium,
  },
  cancelButton: {
    fontSize: 15,
    paddingRight: '3%',
    color: colors.blue.dark,
  },
  body: {
    marginVertical: '30%',
    height: '100%',
    alignItems: 'center',
  },
  bodyText: {
    textAlign: 'center',
    color: colors.gray.medium,
    width: '90%',
  },
  results: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  }
})

const LearnerSearch = () => {
  const [searchText, setSearchText] = useState('')
  const [searchField, setSearchField] = useState('name')
  const { userName } = useSelector((state) => state.auth)

  const baseCase = (
    <View style={styles.body}>
      <Logo style={styles.logo} width="18%" height="18%" />
      <Text
        color={colors.gray.dark}
        fontFamily="heading"
        fontSize="2xl"
        textAlign="center"
      >
        {i18n.t('dict.searchWelcome')}
        {userName}
        {'.'}
      </Text>
      <Text style={styles.bodyText} fontFamily="body">
        {i18n.t('dialogue.startSearching')}
      </Text>
    </View>
  )
  
  const searchResults = () => {
    const results = []
    return (
    <>
  {/* // get all the cards from searching searchText and display them
  // we also need to add a way to only select one card at a time
  // to be done in a later issue?
  // for now it presents example cards */}
  <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    }}
  >
  <View
  style={{
    width: '40%',
  }}
  >
    <StyledButton
    variant={searchField === "admin_name"? 
        "learner_filter_active": "learner_filter_inactive"}
    title={i18n.t('dict.creator')}
    onPress={() => setSearchField('admin_name')}>
    </StyledButton>
  </View>
  <View
  style={{
    width: '50%',
    marginLeft: '2%',
  }}
  >
    <StyledButton
    variant={searchField === "name"? 
    "learner_filter_active": "learner_filter_inactive"}
    title={i18n.t('dict.learningLanguage')}
    onPress={() => setSearchField('name')}>
    </StyledButton>
  </View>
  </View>
  <View style={styles.results}>
    <ScrollView>

      <SearchResultCard languageName='Spanish'
    learnerLanguage='Spanish'
    creatorName='Ellie'
    unitNumber={5}
    languageDescription= 'This is the description'/>
      <SearchResultCard languageName='French'
      learnerLanguage='English'
    creatorName='Jamie'
    unitNumber={4}
    languageDescription= 'This is a different description'/>

    </ScrollView>
    </View>
    </>
  )}

  return (
    <View >
      <View style={styles.search}>
        <Input
          value={searchText}
          borderRadius={10}
          placeholderTextColor={colors.blue.dark}
          placeholder={i18n.t('actions.searchCourses')}
          backgroundColor={colors.blue.light}
          onChangeText={setSearchText}
          InputLeftElement={(
            <AntDesign
              name="search1"
              size={24}
              color={colors.blue.dark}
              style={{ paddingLeft: '3%' }}
            />
          )}
          InputRightElement={(
            <Text style={styles.cancelButton}
              onPress={() => {
                setSearchText('')
              }}
            >
              {searchText !== '' ? 'Cancel' : ''}
            </Text>
          )}
        />
      </View>
      {searchText ? searchResults() : baseCase }
    </View>
  )
}

export default LearnerSearch
