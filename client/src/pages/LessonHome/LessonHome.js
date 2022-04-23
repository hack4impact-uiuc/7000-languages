import React from 'react'
import { StyleSheet } from 'react-native'
import { colors } from 'theme'
import LanguageHome from 'pages/LanguageHome'

const styles = StyleSheet.create({
    root: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.red.dark,
    },
    top: {
        backgroundColor: colors.red.dark,
        minHeight: 100,
        overflow: 'hidden',
        display: 'flex',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    manageBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
  })

  const data = [
    {
      _id: 'aenasdas',
      title: '¿Como se dice?',
      lessons: 'How do you say ___?',
      audio: true,
    },
    {
      _id: 'asdnemsa',
      title: '¿Que hora es?',
      lessons: 'What time is it?',
    },
    {
      _id: 'mehjasjd',
      title: '¿Donde esta la playa?',
      lessons: 'Where is the beach?',
      audio: true
    },
    
  ]

  const LessonHome = ({navigation}) => {
    return (
        <LanguageHome
        isLessonHome
        navigation={navigation}
        lessonDescription='Information about this lesson!'
        valueName='Lessons'
        rightIconName='plus-circle'
        toNavigate='ManageLessons'
        toNext='LessonHome'
        data={data}
        >

        </LanguageHome>
      )
  }

  export default LessonHome