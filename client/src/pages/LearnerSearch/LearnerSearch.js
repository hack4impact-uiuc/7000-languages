import React, { useEffect, useState } from 'react'
import { colors } from 'theme'
import { Text, Input, ScrollView } from 'native-base'
import { StyleSheet, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import SearchResultCard from 'components/SearchResultCard'
import StyledButton from 'components/StyledButton'
import { getSearchCourses } from 'api'
import { useTrackPromise, useErrorWrap } from 'hooks'
import PropTypes from 'prop-types'
import { getAllUserCourses } from 'utils/languageHelper'
import { setPersonalInfo } from 'slices/auth.slice'
import { setField } from 'slices/language.slice'

import i18n from 'utils/i18n'
import Logo from '../../../assets/images/logo-sm-gray.svg'

const styles = StyleSheet.create({
  cancelButton: {
    display: 'flex',
    paddingTop: '6%',
    paddingLeft: '2%',
    fontSize: 15,
    color: colors.blue.dark,
  },
  body: {
    marginVertical: '20%',
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
  },
})

const LearnerSearch = ({ navigation }) => {
  const [searchText, setSearchText] = useState('')
  const [searchField, setSearchField] = useState('name')
  const { userName } = useSelector((state) => state.auth)
  const errorWrap = useErrorWrap()
  const dispatch = useDispatch()

  const [allCourses, setAllCourses] = useState([])

  const trackPromise = useTrackPromise()

  useEffect(() => {
    const getCourses = async () => {
      const { result: courses } = await trackPromise(getSearchCourses())
      setAllCourses(courses)
    }
    getCourses()
  }, [setAllCourses])

  const navigateToNewCourse = async (courseId) => {
    // Refetches the user's data and courses and navigates to a new course
    await errorWrap(async () => {
      const {
        picture: profileUrl,
        name,
        email: userEmail,
        courses,
      } = await trackPromise(getAllUserCourses())

      // Set personal info
      dispatch(setPersonalInfo({ profileUrl, userName: name, userEmail }))

      if (courses.length > 0) {
        dispatch(setField({ key: 'allCourses', value: courses }))
      }

      navigation.navigate(`${courseId}-learner`)
    })
  }

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
        {userName !== undefined && `, ${userName}.`}
      </Text>
      <Text style={styles.bodyText} fontFamily="body">
        {i18n.t('dialogue.startSearching')}
      </Text>
    </View>
  )

  const filterOptions = (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          width: '50%',
        }}
      >
        <StyledButton
          variant={
            searchField === 'name'
              ? 'learner_filter_active'
              : 'learner_filter_inactive'
          }
          title={i18n.t('dict.learningLanguage')}
          onPress={() => setSearchField('name')}
        />
      </View>
      <View
        style={{
          width: '40%',
          marginLeft: '2%',
        }}
      >
        <StyledButton
          variant={
            searchField === 'admin_name'
              ? 'learner_filter_active'
              : 'learner_filter_inactive'
          }
          title={i18n.t('dict.creator')}
          onPress={() => setSearchField('admin_name')}
        />
      </View>
    </View>
  )

  const extraSpaceView = <View style={{ height: 400 }} />

  const searchResults = () => {
    let filteredCourses

    if (searchText !== '') {
      filteredCourses = allCourses.filter((course) => course.details[searchField]
        .toLowerCase()
        .includes(searchText.toLowerCase()))
    } else {
      filteredCourses = allCourses
    }

    if (filteredCourses.length === 0) {
      return (
        <>
          {filterOptions}
          {baseCase}
        </>
      )
    }

    return (
      <>
        {filterOptions}
        <View style={styles.results}>
          <ScrollView>
            {filteredCourses.map((courseData) => (
              <SearchResultCard
                key={courseData._id}
                languageName={courseData.details.name}
                learnerLanguage={courseData.details.translated_language}
                creatorName={courseData.details.admin_name}
                unitNumber={courseData.numUnits}
                languageDescription={courseData.details.description}
                courseId={courseData._id}
                isPrivate={courseData.details.is_private}
                navigateToNewCourse={navigateToNewCourse}
              />
            ))}
            {extraSpaceView}
          </ScrollView>
        </View>
      </>
    )
  }

  return (
    <>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <View
          {...(searchText === ''
            ? {
              style: {
                marginVertical: '3%',
                py: '1',
                px: '2',
                marginLeft: 18,
                variant: 'filled',
                color: colors.blue.medium,
                width: '90%',
              },
            }
            : {
              style: {
                marginVertical: '3%',
                py: '1',
                px: '2',
                marginLeft: 18,
                variant: 'filled',
                color: colors.blue.medium,
                width: '80%',
              },
            })}
        >
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
          />
        </View>
        {searchText.length > 0 && (
          <Text style={styles.cancelButton} onPress={() => setSearchText('')}>
            {i18n.t('actions.cancel')}
          </Text>
        )}
      </View>
      <View>{searchResults()}</View>
    </>
  )
}

LearnerSearch.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

LearnerSearch.defaultProps = {
  navigation: { navigate: () => null },
}

export default LearnerSearch
