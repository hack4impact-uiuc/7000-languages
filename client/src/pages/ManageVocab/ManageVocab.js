import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ManageView from 'components/ManageView'

import { useErrorWrap } from 'hooks'
import { useSelector, useDispatch } from 'react-redux'
import { setField } from 'slices/language.slice'
import { updateVocabItems } from 'api'
import _ from 'lodash'
import { INDICATOR_TYPES } from 'utils/constants'

const ManageVocab = ({ navigation }) => {
  const errorWrap = useErrorWrap()
  const dispatch = useDispatch()
  const { lessonData, currentCourseId, currentLessonId } = useSelector((state) => state.language)
  const allVocab = lessonData.vocab
  console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n" + JSON.stringify(allVocab))
  const [selected, setSelected] = useState([])
  const [unselected, setUnselected] = useState([])

  /**
   * Filters all of the vocab items into selected and unselected lists
   */
  useEffect(() => {
    let selectedList = []
    let unselectedList = []
    for (let i = 0; i < allVocab.length; i += 1) {
      const item = allVocab[i]

      const formattedItem = {
        _id: item._id,
        title: item.original,
        body: item.translation,
        indicatorType: INDICATOR_TYPES.NONE, // TODO: remove hard-coded value
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
  }, [allVocab])

  /**
   * Calls API in order to update vocab data
   * @param {*} selectedData List of vocab item objects that are marked as selected
   * @param {*} unselectedData List of vocab item objects that are marked as unselected
   */
  const saveChanges = async (selectedData, unselectedData) => {
    errorWrap(
      async () => {
        /* We need to iterate through allVocab, and update the selected and _order fields */
        const updatedAllVocab = _.cloneDeep(allVocab)

        for (let i = 0; i < selectedData.length; i += 1) {
          const updatedIdx = updatedAllVocab.findIndex(
            (element) => element._id === selectedData[i]._id,
          )
          updatedAllVocab[updatedIdx].selected = true
          updatedAllVocab[updatedIdx]._order = i
        }

        for (let i = 0; i < unselectedData.length; i += 1) {
          const updatedIdx = updatedAllVocab.findIndex(
            (element) => element._id === unselectedData[i]._id,
          )
          updatedAllVocab[updatedIdx].selected = false
          updatedAllVocab[updatedIdx]._order = i
        }

        // Makes API request
        await updateVocabItems(currentCourseId, currentLessonId, updatedAllVocab)
        // Updates Redux store
        dispatch(setField({ key: 'lessonData', value: updatedAllVocab }))
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
      selectedTitleText="Test"
      unselectedTitleText="Unselected Vocab Items"
      selectedBodyText="These vocab items will be available to your students. Drag them around to reorder them."
      unselectedBodyText="These vocab items are not included in your course. You can still continue to edit them."
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
