import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ManageView from 'components/ManageView'

import { useErrorWrap } from 'hooks'
import { useSelector, useDispatch } from 'react-redux'
import { updateVocabs, setField, updateNumVocab } from 'slices/language.slice'
import { updateVocabItems, deleteVocabItem } from 'api'
import _ from 'lodash'
import { INDICATOR_TYPES } from 'utils/constants'
import i18n from 'utils/i18n'

const ManageVocab = ({ navigation }) => {
  const errorWrap = useErrorWrap()
  const dispatch = useDispatch()
  const { lessonData, currentCourseId, currentLessonId } = useSelector(
    (state) => state.language,
  )
  const [selected, setSelected] = useState([])
  const [unselected, setUnselected] = useState([])

  /**
   * Filters all of the vocab items into selected and unselected lists
   */
  useEffect(() => {
    let selectedList = []
    let unselectedList = []
    for (let i = 0; i < lessonData.vocab.length; i += 1) {
      const item = lessonData.vocab[i]

      const formattedItem = {
        _id: item._id,
        title: item.original,
        body: item.translation,
        indicatorType: INDICATOR_TYPES.NONE,
        _order: item._order,
      }

      if (item.selected) {
        selectedList.push(formattedItem)
      } else {
        unselectedList.push(formattedItem)
      }
    }

    // Lessons have order, so we must sort them before they are saved to local state
    selectedList = selectedList.sort((a, b) => a._order - b._order)
    unselectedList = unselectedList.sort((a, b) => a._order - b._order)

    setSelected(selectedList)
    setUnselected(unselectedList)
  }, [lessonData.vocab])

  /**
   * Calls API in order to update vocab data
   * @param {*} selectedData List of vocab item objects that are marked as selected
   * @param {*} unselectedData List of vocab item objects that are marked as unselected
   */
  const saveChanges = async (selectedData, unselectedData, deletedData) => {
    errorWrap(
      async () => {
        /* We need to iterate through allVocab, and update the selected and _order fields */
        const deletedIds = deletedData.map((data) => data._id)

        const updatedAllVocab = _.cloneDeep(lessonData.vocab).filter(
          (vocab) => !deletedIds.includes(vocab._id),
        )

        // Delete removed vocab from unselected vocab
        const filteredUnselectedData = unselectedData.filter(
          (vocab) => !deletedIds.includes(vocab._id),
        )

        for (let i = 0; i < selectedData.length; i += 1) {
          const updatedIdx = updatedAllVocab.findIndex(
            (element) => element._id === selectedData[i]._id,
          )
          updatedAllVocab[updatedIdx].selected = true
          updatedAllVocab[updatedIdx]._order = i
        }

        for (let i = 0; i < filteredUnselectedData.length; i += 1) {
          const updatedIdx = updatedAllVocab.findIndex(
            (element) => element._id === filteredUnselectedData[i]._id,
          )
          updatedAllVocab[updatedIdx].selected = false
          updatedAllVocab[updatedIdx]._order = i
        }

        // Makes API requests
        // Delete needs to happen before update since we don't want
        // the updates to validate against deleted documents
        await Promise.all(
          deletedIds.map((vocabId) => deleteVocabItem(currentCourseId, currentLessonId, vocabId)),
        )
        // Update existing
        await updateVocabItems(
          currentCourseId,
          currentLessonId,
          updatedAllVocab,
        )
        // Updates Redux store
        dispatch(updateVocabs({ vocabItems: updatedAllVocab }))
        // In the Redux store, updates the num_vocab field for the lesson that these vocab items belong to
        dispatch(updateNumVocab({ numSelected: selectedData.length }))
      },
      () => {
        // on success, go back
        navigation.goBack()
      },
    )
  }

  /**
   * Navigates to the Vocab Drawer modal
   */
  const add = () => {
    // Since we aren't editing a vocab item, we need to clear the current vocab id
    dispatch(setField({ key: 'currentVocabId', value: '' }))
    navigation.navigate('Modal', { screen: 'VocabDrawer' })
  }

  return (
    <ManageView
      navigation={navigation}
      selectedTitleText={i18n.t('dict.selectedVocab')}
      unselectedTitleText={i18n.t('dict.unselectedVocab')}
      selectedBodyText={i18n.t('dialogue.selectedVocabPrompt')}
      unselectedBodyText={i18n.t('dialogue.unselectedVocabPrompt')}
      addText="Create Vocab Item"
      saveCallback={saveChanges}
      addCallback={add}
      initialSelectedData={selected}
      initialUnselectedData={unselected}
    />
  )
}

ManageVocab.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }),
}

ManageVocab.defaultProps = {
  navigation: { navigate: () => null, goBack: () => null },
}

export default ManageVocab
