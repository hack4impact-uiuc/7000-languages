import React, { useEffect, useState, useRef } from 'react'
import LanguageHome from 'components/LanguageHome'
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types'
import * as FileSystem from 'expo-file-system'

import { useSelector, useDispatch } from 'react-redux'
import { setField, resetField } from 'slices/language.slice'
import { getLesson, downloadImageFile, downloadAudioFile } from 'api'
import { useErrorWrap, useTrackPromise } from 'hooks'
import i18n from 'utils/i18n'

const LessonHome = ({ navigation }) => {
  const errorWrap = useErrorWrap()
  const trackPromise = useTrackPromise()
  const dispatch = useDispatch()
  const {
    currentCourseId, currentLessonId, currentUnitId, lessonData,
  } = useSelector((state) => state.language)

  const [data, setData] = useState([])
  const [lessonDescription, setLessonDescription] = useState('')
  const mounted = useRef(false)

  // Fixes the warning that we are setting the state of unmounted components in the call back functions for downloads
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  /**
   * When going back from the Lesson Page to the Unit Page,
   * we need to clear the data presented on the Lesson Page
   * since it may be different the next time the user visits the Lesson Page.
   *
   * Source: https://reactnavigation.org/docs/preventing-going-back/
   */
  React.useEffect(
    () => navigation.addListener('beforeRemove', (e) => {
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
        const selectedData = lessonData.vocab.filter((item) => item.selected)
        let formattedVocabData = lessonData.vocab.map(async (item) => {
          const imageUri = await AsyncStorage.getItem(`${item._id}/image`)
          //console.log("keys ", await AsyncStorage.getAllKeys())
          if(imageUri == null)
          {
            item.image = ''
          }
          //console.log(imageUri)
          const audioUri = await AsyncStorage.getItem(`${item._id}/audio`)
          //console.log("A: ",audioUri)

          const formattedItem = {
            _id: item._id,
            name: item.original,
            body: item.translation,
            audioURI: audioUri == null ? item.audioURI : audioUri,
            audio: item.audio !== '',
            _order: item._order,
            imageURI: imageUri == null ? item.imageURI : imageUri,
            image: item.image !== '',
          }

          //console.log("Formatted is ", formattedItem.imageURI)
          //console.log("Item is ", item.imageURI)
          //console.log(imageUri == null)

          if (item.imageURI) {
            formattedItem.imageURI = item.imageURI
          } else if (item.image !== '') {
            const filePath = item.image
            const splitPath = filePath.split('.')

            // Get the file type from the vocabItem's image field
            const fileType = splitPath.length === 2 ? splitPath[1] : 'jpg'

            // Need to fetch image uri
            // [TODO]: Add backend trackPromise()
            console.log("Downloading ", formattedItem.name)
            downloadImageFile(
              currentCourseId,
              currentUnitId,
              currentLessonId,
              item._id,
              fileType,
            ).then((value) => {
              if (mounted) {
                formattedItem.imageURI = value
                //spread to force react to re-render so it thinks formattedVocabData is a new object
                setData([...formattedVocabData])
              }
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
              if (mounted) {
                formattedItem.audioURI = value
                //console.log("setdata");
                setData([...formattedVocabData])
              }
            })
          }
          return formattedItem
        })
        formattedVocabData = await Promise.all(formattedVocabData)
        const sortedData = formattedVocabData.sort(
          (a, b) => a._order - b._order,
        )
        setData(sortedData)
      }
    }
    getData()
  }, [lessonData])

  /**
   * Navigates to the Manage Vocab Page
   */
  const navigateToManage = () => {
    navigation.navigate('ManageVocab')
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

  const navigateToAdd = () => {
    // Since we aren't editing a vocab item, we need to clear the current vocab id
    dispatch(setField({ key: 'currentVocabId', value: '' }))
    navigation.navigate('Modal', { screen: 'VocabDrawer' })
  }

  return (
    <LanguageHome
      lessonDescription={lessonDescription}
      singularItemText={i18n.t('dict.vocabItemSingle')}
      pluralItemText={i18n.t('dict.vocabItemPlural')}
      manageIconName="cog"
      manageButtonText={i18n.t('actions.manageVocab')}
      addButtonText="Add Vocab Item"
      data={data}
      buttonCallback={navigateToManage}
      nextPageCallback={goToNextPage}
      addCallback={navigateToAdd}
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