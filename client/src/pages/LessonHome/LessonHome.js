import React, { useEffect, useState } from 'react'
import LanguageHome from 'pages/LanguageHome'
import PropTypes from 'prop-types'

import { useSelector, useDispatch } from 'react-redux'
import { setField } from 'slices/language.slice'
import { getLesson } from 'api'
import useErrorWrap from 'hooks/useErrorWrap'

const LessonHome = ({ navigation }) => {
  const errorWrap = useErrorWrap()
  const dispatch = useDispatch()
  const { currentCourseId, currentLessonId, lessonData } = useSelector(
    (state) => state.language,
  )

  const [data, setData] = useState([])
  const [lessonDescription, setLessonDescription] = useState('')

  /**
   * Gets the data for the lesson being presented, including the vocab items in the lesson
   */
  useEffect(() => {
    const getLessonData = async () => {
      errorWrap(async () => {
        const { result } = await getLesson(currentCourseId, currentLessonId)

        setLessonDescription(result.description)
        navigation.setOptions({
          title: result.name,
        })
        dispatch(setField({ key: 'lessonData', value: result }))
      })
    }

    getLessonData()
  }, [currentCourseId, currentLessonId, navigation])

  /**
   * Updates the formatted vocab data that will be presented on this page
   */
  useEffect(() => {
    let formattedVocabData = []

    for (let i = 0; i < lessonData.vocab.length; i += 1) {
      const item = lessonData.vocab[i]

      const formattedItem = {
        _id: item._id,
        name: item.original,
        body: item.translation,
        audio: item.audio !== '',
        _order: item._order,
      }
      formattedVocabData.push(formattedItem)
    }

    formattedVocabData = formattedVocabData.sort((a, b) => a._order - b._order)

    setData(formattedVocabData)
  }, [lessonData])

  /**
   * Navigates to the Vocab Drawer for adding a vocab item
   */
  const navigateTo = () => {
    // Since we aren't editing a vocab item, we need to clear the current vocab id
    dispatch(setField({ key: 'currentVocabId', value: '' }))
    navigation.navigate('Modal', { screen: 'VocabDrawer' })
  }

  /**
   * Navigates to the Vocab Drawer for editing a vocab item
   * @param {Object} element Vocab Item that was selected
   */
  const goToNextPage = (element) => {
    const currentVocabId = element._id
    // Save the id of the vocab item that we need to edit
    dispatch(setField({ key: 'currentVocabId', value: currentVocabId }))
    navigation.navigate('Modal', { screen: 'VocabDrawer' })
  }

  return (
    <LanguageHome
      isLessonHome
      lessonDescription={lessonDescription}
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
    setOptions: PropTypes.func,
  }),
}

LessonHome.defaultProps = {
  navigation: {
    navigate: () => null,
    goBack: () => null,
    setOptions: () => null,
  },
}

export default LessonHome
