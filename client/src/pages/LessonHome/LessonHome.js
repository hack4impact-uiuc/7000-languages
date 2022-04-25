import React, { useEffect, useState } from 'react'
import LanguageHome from 'pages/LanguageHome'
import PropTypes from 'prop-types'

import { useSelector, useDispatch } from 'react-redux' // import at the top of the file
import { setCurrentVocabId } from 'slices/language.slice'

const LessonHome = ({ navigation }) => {
  const { allLessons, currentLessonId } = useSelector((state) => state.language)

  const [data, setData] = useState([])

  useEffect(() => {
    const lessonIndex = allLessons.findIndex(
      (element) => element._id === currentLessonId,
    )
    setData(allLessons[lessonIndex].vocab)
  }, [currentLessonId])

  const dispatch = useDispatch()

  const navigateTo = () => {
    navigation.navigate('Modal', { screen: 'VocabDrawer' })
  }

  const goToNextPage = (element) => {
    const currentVocabId = element._id
    dispatch(setCurrentVocabId({ currentVocabId }))
    navigation.navigate('Modal', { screen: 'VocabDrawer' })
  }

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
