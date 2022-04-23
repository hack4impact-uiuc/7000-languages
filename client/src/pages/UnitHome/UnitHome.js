import React from 'react'
import { element } from 'prop-types'
import LanguageHome from 'pages/LanguageHome'
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
    
      return (
          <LanguageHome
          navigation={navigation}
          languageDescription='Some text describing this unit. Hopefully they write 2-3 sentences here to make it look nice.'
          valueName='Lessons'
          buttonText='Manage Lessons'
          rightIconName='plus-circle'
          toNavigate='manageLessons'
          data={data}
          >

          </LanguageHome>
      )
}

export default UnitHome
