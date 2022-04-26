import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import LanguageHome from 'pages/LanguageHome'
import { useSelector, useDispatch } from 'react-redux'
import { setField } from 'slices/language.slice'
import { getCourse } from 'api'
import useErrorWrap from 'hooks/useErrorWrap'
import { INDICATOR_TYPES } from '../../utils/constants'

const CourseHome = ({ navigation }) => {
  const { currentCourseId, allUnits } = useSelector((state) => state.language)

  const errorWrap = useErrorWrap()
  const dispatch = useDispatch()

  const [data, setData] = useState([])
  const [courseDescription, setCourseDescription] = useState('')
  const [courseName, setCourseName] = useState('')

  /**
   * Gets course data from the API and updates the title and description of the page
   * */
  useEffect(() => {
    const getCourseData = async () => {
      errorWrap(async () => {
        const { result } = await getCourse(currentCourseId)
        const { course, units } = result

        setCourseDescription(course.details.description)
        setCourseName(course.details.name)

        navigation.setOptions({
          title: 'Course Home',
        })
        dispatch(setField({ key: 'courseDetails', value: course.details }))
        dispatch(setField({ key: 'allUnits', value: units }))
      })
    }
    getCourseData()
  }, [currentCourseId])

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
          indicatorType: INDICATOR_TYPES.INCOMPLETE,
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
      valueName="Units"
      buttonText="Manage Units"
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
}

CourseHome.defaultProps = {
  navigation: {
    navigate: () => null,
    goBack: () => null,
    setOptions: () => null,
  },
}

export default CourseHome
