import React from 'react'
import PropTypes, { element } from 'prop-types'
import LanguageHome from 'pages/LanguageHome'
import { INDICATOR_TYPES } from '../../utils/constants'

const CourseHome = ({ navigation }) => {
    const data = [
        {
          _id: 'abcdef',
          title: 'Unit 1',
          lessons: '2 Lessons',
          indicatorType: INDICATOR_TYPES.COMPLETE,
        },
        {
          _id: 'aenasdas',
          title: 'Unit 2',
          lessons: '7 Lessons',
          indicatorType: INDICATOR_TYPES.INCOMPLETE,
        },
        {
          _id: 'asdnemsa',
          title: 'Unit 3',
          lessons: '4 Lessons',
          indicatorType: INDICATOR_TYPES.COMPLETE,
        },
        {
          _id: 'mehjasjd',
          title: 'Unit 5',
          lessons: '3 Lessons',
          indicatorType: INDICATOR_TYPES.COMPLETE,
        },
        {
          _id: 'asdnemsa',
          title: 'Unit 3',
          lessons: '4 Lessons',
          indicatorType: INDICATOR_TYPES.COMPLETE,
        },
        {
          _id: 'mehjasjd',
          title: 'Unit 5',
          lessons: '3 Lessons',
          indicatorType: INDICATOR_TYPES.COMPLETE,
        },
        {
          _id: 'asdnemsa',
          title: 'Unit 3',
          lessons: '4 Lessons',
          indicatorType: INDICATOR_TYPES.COMPLETE,
        },
        {
          _id: 'mehjasjd',
          title: 'Unit 5',
          lessons: '3 Lessons',
          indicatorType: INDICATOR_TYPES.COMPLETE,
        },
        {
          _id: 'asdnemsa',
          title: 'Unit 3',
          lessons: '4 Lessons',
          indicatorType: INDICATOR_TYPES.COMPLETE,
        },
        {
          _id: 'mehjasjd',
          title: 'Unit 5',
          lessons: '3 Lessons',
          indicatorType: INDICATOR_TYPES.COMPLETE,
        },
        
      ]
    
      return (
          <LanguageHome
          navigation={navigation}
          languageName='Spanish'
          languageDescription='Spanish is a wonderful language that prides itself in its world reach and rich, diverse cultures.'
          valueName='Units'
          buttonText='Manage Units'
          rightIconName='pencil'
          toNavigate='ManageUnits'
          toNext='UnitHome'
          data={data}
          >

          </LanguageHome>
      )
}

export default CourseHome
