import React, { useState, useEffect } from 'react'
import LanguageHome from 'pages/LanguageHome'
import PropTypes from 'prop-types'

import { useSelector, useDispatch } from 'react-redux'
import { setField } from 'slices/language.slice'
import { getUnit } from 'api'
import useErrorWrap from 'hooks/useErrorWrap'
import { INDICATOR_TYPES } from '../../utils/constants'

const UnitHome = ({ navigation }) => {
  const errorWrap = useErrorWrap()
  const dispatch = useDispatch()
  const { currentCourseId, currentUnitId } = useSelector(
    (state) => state.language,
  )

  const [data, setData] = useState([])
  const [unitDescription, setUnitDescription] = useState('')

  /**
   * Gets the data for the unit being presented, including the lessons in the unit
   */
  useEffect(() => {
    const getLessonData = async () => {
      errorWrap(async () => {
        const { result } = await getUnit(currentCourseId, currentUnitId)
        const { unit, lessons } = result

        setUnitDescription(unit.description)

        navigation.setOptions({
          title: unit.name,
        })

        dispatch(setField({ key: 'allLessons', value: lessons }))

        const formattedLessonData = []

        for (let i = 0; i < lessons.length; i += 1) {
          const item = lessons[i]

          const formattedItem = {
            _id: item._id,
            name: item.name,
            body: `${item.num_vocab} Vocab ${
              item.num_vocab === 1 ? 'Item' : 'Items'
            }`,
            indicatorType: INDICATOR_TYPES.COMPLETE,
          }
          formattedLessonData.push(formattedItem)
        }

        setData(formattedLessonData)
      })
    }
    getLessonData()
  }, [currentCourseId])

  const navigateToManage = () => {
    navigation.navigate('ManageLessons')
  }

  const goToNextPage = (element) => {
    const currentLessonId = element._id
    dispatch(setField({ key: 'currentLessonId', value: currentLessonId }))
    navigation.navigate('LessonHome')
  }

  return (
    <LanguageHome
      languageDescription={unitDescription}
      valueName="Lessons"
      buttonText="Manage Lessons"
      rightIconName="plus-circle"
      buttonCallback={navigateToManage}
      nextPageCallback={goToNextPage}
      data={data}
    />
  )
}

UnitHome.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
    setOptions: PropTypes.func,
  }),
}

UnitHome.defaultProps = {
  navigation: {
    navigate: () => null,
    goBack: () => null,
    setOptions: () => null,
  },
}

export default UnitHome
