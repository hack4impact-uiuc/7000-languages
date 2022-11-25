import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import LearnerHome from 'components/LearnerHome'
import { useSelector, useDispatch } from 'react-redux'
import { setField } from 'slices/language.slice'
import i18n from 'utils/i18n'
import { colors } from 'theme'
import { INDICATOR_TYPES } from '../../utils/constants'

const LearnerCourseHome = ({ navigation, courseDescription, courseName }) => {
  const { allUnits, courseDetails } = useSelector((state) => state.language)

  const dispatch = useDispatch()

  const [data, setData] = useState([])
  const [name, setName] = useState(courseName)
  const [description, setDescription] = useState(courseDescription)

  /**
   * Change the header style to blue
   */
  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: colors.blue.medium },
    })
  }, [navigation])

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

  useEffect(() => {
    setName(courseDetails.name)
    setDescription(courseDetails.description)
  }, [courseDetails])

  // Sets the title of the page
  useEffect(() => {
    setName(courseName)
    setDescription(courseDescription)
    navigation.setOptions({
      title: `${i18n.t('dict.courseHome')}`,
    })
  }, [courseName, courseDescription])

  /**
   * Navigates to the Unit Page
   * @param {Object} element Unit that was selected on this page
   */
  const goToNextPage = (element) => {
    const currentUnitId = element._id
    dispatch(setField({ key: 'currentUnitId', value: currentUnitId })) // make sure to save the selected unit in state
    navigation.navigate('LearnerUnitHome')
  }

  return (
    <LearnerHome
      languageName={name}
      languageDescription={description}
      singularItemText={i18n.t('dict.unitSingle')}
      pluralItemText={i18n.t('dict.unitPlural')}
      nextPageCallback={goToNextPage}
      data={data}
    />
  )
}

LearnerCourseHome.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
    setOptions: PropTypes.func,
  }),
  courseDescription: PropTypes.string,
  courseName: PropTypes.string,
}

LearnerCourseHome.defaultProps = {
  navigation: {
    navigate: () => null,
    goBack: () => null,
    setOptions: () => null,
  },
  courseDescription: '',
  courseName: '',
}

export default LearnerCourseHome
