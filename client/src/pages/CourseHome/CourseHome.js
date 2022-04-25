import React from 'react'
import PropTypes from 'prop-types'
import LanguageHome from 'pages/LanguageHome'
import { INDICATOR_TYPES } from '../../utils/constants'

const CourseHome = ({ navigation }) => {
  const data = [
    {
      _id: 'abcdef',
      title: 'Unit 1',
      lessons: '1 Lessons',
      indicatorType: INDICATOR_TYPES.COMPLETE,
    },
    {
      _id: 'aenasdas',
      title: 'Unit 2',
      lessons: '2 Lessons',
      indicatorType: INDICATOR_TYPES.INCOMPLETE,
    },
    {
      _id: 'asdnemsa',
      title: 'Unit 3',
      lessons: '3 Lessons',
      indicatorType: INDICATOR_TYPES.COMPLETE,
    },
    {
      _id: 'mehjasjd',
      title: 'Unit 4',
      lessons: '4 Lessons',
      indicatorType: INDICATOR_TYPES.COMPLETE,
    },
    {
      _id: 'asdnemsa',
      title: 'Unit 5',
      lessons: '5 Lessons',
      indicatorType: INDICATOR_TYPES.COMPLETE,
    },
    {
      _id: 'mehjasjd',
      title: 'Unit 6',
      lessons: '6 Lessons',
      indicatorType: INDICATOR_TYPES.COMPLETE,
    },
    {
      _id: 'asdnemsa',
      title: 'Unit 7',
      lessons: '7 Lessons',
      indicatorType: INDICATOR_TYPES.COMPLETE,
    },
    {
      _id: 'mehjasjd',
      title: 'Unit 8',
      lessons: '8 Lessons',
      indicatorType: INDICATOR_TYPES.COMPLETE,
    },
    {
      _id: 'asdnemsa',
      title: 'Unit 9',
      lessons: '9 Lessons',
      indicatorType: INDICATOR_TYPES.COMPLETE,
    },
    {
      _id: 'mehjasjd',
      title: 'Unit 10',
      lessons: '10 Lessons',
      indicatorType: INDICATOR_TYPES.COMPLETE,
    },
  ]

  const navigateToManage = () => {
    navigation.navigate('ManageUnits')
  }

  const goToNextPage = () => {
    navigation.navigate('UnitHome')
  }

  return (
    <LanguageHome
      languageName="Spanish"
      languageDescription="Spanish is a wonderful language that prides itself in its world reach and rich, diverse cultures."
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
  }),
}

CourseHome.defaultProps = {
  navigation: { navigate: () => null, goBack: () => null },
}

export default CourseHome
