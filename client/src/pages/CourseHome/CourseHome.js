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

  // Gets course data from the API
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

  // Updates the units shown on this page
  useEffect(() => {
    let formattedUnitData = []

    for (let i = 0; i < allUnits.length; i += 1) {
      const item = allUnits[i]

      // don't display unselected items
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

    formattedUnitData = formattedUnitData.sort((a, b) => a._order - b._order)

    setData(formattedUnitData)
  }, [allUnits])

  const navigateToManage = () => {
    navigation.navigate('ManageUnits')
  }

  const goToNextPage = (element) => {
    const currentUnitId = element._id
    dispatch(setField({ key: 'currentUnitId', value: currentUnitId }))
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
