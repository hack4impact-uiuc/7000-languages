import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import LanguageHome from 'components/LanguageHome'
import { useSelector, useDispatch } from 'react-redux'
import { setField } from 'slices/language.slice'
import { INDICATOR_TYPES } from '../../utils/constants'
// imports to test localization
import * as Localization from 'expo-localization'
import { I18n } from 'i18n-js'

// Set the key-value pairs for the different languages you want to support.
const translations = {
  en: {
    welcome: 'Welcome!',
    units: 'Units',
    manageUnits: 'Manage Units',
    lesson: 'Lesson',
    lessons: 'Lessons',
  },
  fr: {
    welcome: 'Bonjour!',
    units: 'Unités',
    manageUnits: 'Gérer les Unités',
    lesson: 'Leçon',
    lessons: 'Cours',
  },
}
const i18n = new I18n(translations)

// Set the locale once at the beginning of your app.
// i18n.locale = Localization.locale

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true
// To see the fallback mechanism uncomment line below to force app to use Japanese language.
i18n.locale = 'fr'

const CourseHome = ({ navigation, courseDescription, courseName }) => {
  const { allUnits } = useSelector((state) => state.language)

  const dispatch = useDispatch()

  const [data, setData] = useState([])

  /**
   * Updates the units presented in a list on this page
   */
  useEffect(() => {
    let formattedUnitData = []

    for (let i = 0; i < allUnits.length; i += 1) {
      const item = allUnits[i]

      // filters out unselected items
      if (item.selected) {
        const formattedItem = {
          _id: item._id,
          name: item.name,
          body: `${item.num_lessons} ${
            item.num_lessons === 1
              ? `${i18n.t('lesson')}`
              : `${i18n.t('lessons')}`
          }`,
          indicatorType: INDICATOR_TYPES.NONE,
          _order: item._order,
        }
        formattedUnitData.push(formattedItem)
      }
    }

    // Units have order, so we must sort them before presenting to the user
    formattedUnitData = formattedUnitData.sort((a, b) => a._order - b._order)

    setData(formattedUnitData)
  }, [allUnits])

  /**
   * Navigates to the Manage Units Page
   */
  const navigateToManage = () => {
    navigation.navigate('ManageUnits')
  }

  /**
   * Navigates to the Unit Page
   * @param {Object} element Unit that was selected on this page
   */
  const goToNextPage = (element) => {
    const currentUnitId = element._id
    dispatch(setField({ key: 'currentUnitId', value: currentUnitId })) // make sure to save the selected unit in state
    navigation.navigate('UnitHome')
  }

  return (
    <LanguageHome
      languageName={courseName}
      languageDescription={courseDescription}
      valueName={i18n.t('units')}
      buttonText={i18n.t('manageUnits')}
      rightIconName="pencil"
      buttonCallback={navigateToManage}
      nextPageCallback={goToNextPage}
      data={data}
    />
  )
}

CourseHome.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
    setOptions: PropTypes.func,
  }),
  courseDescription: PropTypes.string,
  courseName: PropTypes.string,
}

CourseHome.defaultProps = {
  navigation: {
    navigate: () => null,
    goBack: () => null,
    setOptions: () => null,
  },
  courseDescription: '',
  courseName: '',
}

export default CourseHome
