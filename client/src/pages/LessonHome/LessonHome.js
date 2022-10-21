import React, { useEffect, useState } from 'react'
import LanguageHome from 'components/LanguageHome'
import PropTypes from 'prop-types'

import { useSelector, useDispatch } from 'react-redux'
import { setField, resetField } from 'slices/language.slice'
import { getLesson, downloadImageFile, downloadAudioFile } from 'api'
import { useErrorWrap, useTrackPromise } from 'hooks'

// eslint-disable-next-line no-unused-vars
import _, { clone } from 'lodash'

const LessonHome = ({ navigation }) => {
  const errorWrap = useErrorWrap()
  const trackPromise = useTrackPromise()
  const dispatch = useDispatch()
  const { currentCourseId, currentLessonId, currentUnitId, lessonData } =
    useSelector((state) => state.language)

  const [data, setData] = useState([])
  const [lessonDescription, setLessonDescription] = useState('')

  /**
   * When going back from the Lesson Page to the Unit Page,
   * we need to clear the data presented on the Lesson Page
   * since it may be different the next time the user visits the Lesson Page.
   *
   * Source: https://reactnavigation.org/docs/preventing-going-back/
   */
  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        dispatch(resetField({ key: 'lessonData' }))
        navigation.dispatch(e.data.action)
      }),
    [navigation],
  )

  /**
   * Gets the data for the lesson being presented, including the vocab items in the lesson
   */
  useEffect(() => {
    const getLessonData = async () => {
      errorWrap(async () => {
        const { result } = await trackPromise(
          getLesson(currentCourseId, currentLessonId),
        )

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
    const getData = async () => {
      if (lessonData?.vocab) {
        const formattedVocabData = lessonData.vocab.map((item) => {
          const formattedItem = {
            _id: item._id,
            name: item.original,
            body: item.translation,
            audioURI: '',
            audio: item.audio !== '',
            _order: item._order,
            imageURI: '',
            image: item.image,
          }

          if (item.imageURI) {
            formattedItem.imageURI = item.imageURI
          } else if (item.image !== '') {
            const filePath = item.image
            const splitPath = filePath.split('.')

            // Get the file type from the vocabItem's image field
            const fileType = splitPath.length === 2 ? splitPath[1] : 'jpg'

            // Need to fetch image uri
            // [TODO]: Add backend trackPromise()
            downloadImageFile(
              currentCourseId,
              currentUnitId,
              currentLessonId,
              item._id,
              fileType,
            ).then((value) => {
              const updatedData = formattedVocabData.map((element) => {
                if (element._id === formattedItem._id) {
                  return { ...element, imageURI: value }
                }
                return element
              })
              setData(updatedData)
              return value
            })
          }

          if (item.audioURI) {
            formattedItem.audioURI = item.audioURI
          } else if (item.audio !== '') {
            const filePath = item.audio
            const splitPath = filePath.split('.')

            // Get the file type from the vocabItem's audio field
            const fileType = splitPath.length === 2 ? splitPath[1] : 'm4a'

            // Downloads audio file and gets Filesystem uri
            // [TODO]: Add backend trackPromise()
            downloadAudioFile(
              currentCourseId,
              currentUnitId,
              currentLessonId,
              item._id,
              fileType,
            ).then((value) => {
              const updatedData = formattedVocabData.map((element) => {
                if (element._id === formattedItem._id) {
                  return { ...element, audioURI: value }
                }
                return element
              })
              setData(updatedData)
              return value
            })
          }

          return formattedItem
        })

        const sortedData = formattedVocabData.sort(
          (a, b) => a._order - b._order,
        )

        setData(sortedData)
      }
    }
    getData()
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
      manageIconName="plus-circle"
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
    addListener: PropTypes.func,
    dispatch: PropTypes.func,
  }),
}

LessonHome.defaultProps = {
  navigation: {
    navigate: () => null,
    goBack: () => null,
    setOptions: () => null,
    addListener: () => null,
    dispatch: () => null,
  },
}

export default LessonHome
