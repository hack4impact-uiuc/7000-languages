import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import LanguageHome from 'components/LanguageHome'
import { useSelector, useDispatch } from 'react-redux'
import { setField } from 'slices/language.slice'
import { INDICATOR_TYPES } from '../../utils/constants'

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
            item.num_lessons === 1 ? 'Lesson' : 'Lessons'
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

  /**
   * Navigates to the Add Unit Page
   */
  const navigateToAdd = () => {
    navigation.navigate('Modal', { screen: 'CreateUnit' })
  }

  return (
    <LanguageHome
      languageName={courseName}
      languageDescription={courseDescription}
      valueName="Units"
      manageButtonText="Manage Units"
      addButtonText="Add Unit"
      manageIconName="cog"
      buttonCallback={navigateToManage}
      nextPageCallback={goToNextPage}
      addCallback={navigateToAdd}
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
