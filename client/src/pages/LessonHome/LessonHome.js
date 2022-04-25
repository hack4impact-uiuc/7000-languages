import React from 'react'
import LanguageHome from 'pages/LanguageHome'
import PropTypes from 'prop-types'

const LessonHome = ({ navigation }) => {
  const navigateTo = () => {
    navigation.navigate('Modal', { screen: 'VocabDrawer' })
  }

  const goToNextPage = () => {
    navigation.navigate('Modal', { screen: 'VocabDrawer' })
  }

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
      audio: true,
    },
  ]

  return (
    <LanguageHome
      isLessonHome
      lessonDescription="Information about this lesson!"
      valueName="Lessons"
      rightIconName="plus-circle"
      buttonCallback={navigateTo}
      nextPageCallback={goToNextPage}
      data={data}
    />
  )
}

LessonHome.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }),
}

LessonHome.defaultProps = {
  navigation: { navigate: () => null, goBack: () => null },
}

export default LessonHome
