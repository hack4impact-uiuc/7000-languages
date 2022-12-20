import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import LanguageHome from 'components/LanguageHome'
import { useSelector, useDispatch } from 'react-redux'
import { setField } from 'slices/language.slice'
import i18n from 'utils/i18n'
import { INDICATOR_TYPES } from '../../utils/constants'

const CourseHome = ({ navigation, courseDescription, courseName }) => {
  const { allUnits, courseDetails } = useSelector((state) => state.language)

  const dispatch = useDispatch()

  const [data, setData] = useState([])
  const [name, setName] = useState(courseName)
  const [description, setDescription] = useState(courseDescription)

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
              ? `${i18n.t('dict.lessonSingle')}`
              : `${i18n.t('dict.lessonPlural')}`
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

  useEffect(() => {
    setName(courseDetails.name)
    setDescription(courseDetails.description)
  }, [courseDetails])

  // Sets the title of the page
  useEffect(() => {
    navigation.setOptions({
      title: `${i18n.t('dict.courseHome')}`,
    })
  }, navigation)

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

  const navigateToUpdate = () => {
    navigation.navigate('Modal', { screen: 'UpdateCourse' })
  }
  /**
   * Navigates to the update unit modal
   */
  const navigateToAdd = () => {
    navigation.navigate('Modal', { screen: 'CreateUnit' })
  }

  return (
    <LanguageHome
      languageName={name}
      languageDescription={description}
      singularItemText={i18n.t('dict.unitSingle')}
      pluralItemText={i18n.t('dict.unitPlural')}
      nextUpdate={navigateToUpdate}
      manageIconName="cog"
      rightIconName="pencil"
      buttonCallback={navigateToManage}
      nextPageCallback={goToNextPage}
      manageButtonText={i18n.t('actions.manageUnits')}
      addCallback={navigateToAdd}
      addButtonText={i18n.t('actions.addUnit')}
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
