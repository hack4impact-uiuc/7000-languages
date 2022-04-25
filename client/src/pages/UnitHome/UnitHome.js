import React from 'react'
import LanguageHome from 'pages/LanguageHome'
import PropTypes from 'prop-types'
import { INDICATOR_TYPES } from '../../utils/constants'

const UnitHome = ({ navigation }) => {
  const data = [
    {
      _id: 'abcdef',
      title: 'Lesson 3',
      lessons: '2 Vocab Items',
      indicatorType: INDICATOR_TYPES.COMPLETE,
    },
    {
      _id: 'aenasdas',
      title: 'Lesson 4',
      lessons: '2 Vocab Items',
      indicatorType: INDICATOR_TYPES.INCOMPLETE,
    },
    {
      _id: 'asdnemsa',
      title: 'Lesson 5',
      lessons: '7 Vocab Items',
      indicatorType: INDICATOR_TYPES.COMPLETE,
    },
  ]

  const navigateToManage = () => {
    navigation.navigate('ManageLessons')
  }

  const goToNextPage = () => {
    navigation.navigate('LessonHome')
  }

  return (
    <LanguageHome
      languageDescription="Some text describing this unit. Hopefully they write 2-3 sentences here to make it look nice."
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
  }),
}

UnitHome.defaultProps = {
  navigation: { navigate: () => null, goBack: () => null },
}

export default UnitHome
