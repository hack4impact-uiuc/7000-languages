import React, { useEffect, useState } from 'react'
import LanguageHome from 'pages/LanguageHome'
import PropTypes from 'prop-types'

import { useSelector, useDispatch } from 'react-redux' // import at the top of the file
import { setCurrentVocabId } from 'slices/language.slice'
import { getLesson } from 'api'

const LessonHome = ({ navigation }) => {

  const errorWrap = useErrorWrap()
  const dispatch = useDispatch()
  const { currentCourseId, currentLessonId } = useSelector((state) => state.language)

  const [data, setData] = useState([])

  useEffect(() => {
    const getLessonData = async () => {
      errorWrap(
        async () => {
          const { result } = await getLesson(currentCourseId, currentLessonId);
          setData(result.vocab);
        }
      )
    }

    getLessonData();

  }, [currentLessonId])

  const navigateTo = () => {
    navigation.navigate('Modal', { screen: 'VocabDrawer' })
  }

  const goToNextPage = (element) => {
    const currentVocabId = element._id;
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
