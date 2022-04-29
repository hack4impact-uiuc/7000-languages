import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ManageView from 'components/ManageView'

import { useErrorWrap } from 'hooks'
import { useSelector, useDispatch } from 'react-redux'
import { setField, updateNumLessons } from 'slices/language.slice'
import { updateLessons } from 'api'
import _ from 'lodash'
import { INDICATOR_TYPES } from 'utils/constants'

const ManageLessons = ({ navigation }) => {
  const errorWrap = useErrorWrap()
  const dispatch = useDispatch()
  const { allLessons, currentCourseId } = useSelector((state) => state.language)

  const [selected, setSelected] = useState([])
  const [unselected, setUnselected] = useState([])

  /**
   * Filers all of the lessons into selected and unselected lists
   */
  useEffect(() => {
    let selectedList = []
    let unselectedList = []

    for (let i = 0; i < allLessons.length; i += 1) {
      const item = allLessons[i]

      const formattedItem = {
        _id: item._id,
        title: item.name,
        body: `${item.num_vocab} Vocab ${
          item.num_vocab === 1 ? 'Item' : 'Items'
        }`,
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
  }, [allLessons])

  /**
   * Calls API in order to update lesson data
   * @param {*} selectedData List of Unit objects that are marked as selected
   * @param {*} unselectedData List of unit objects that are marked as unselected
   */
  const saveChanges = async (selectedData, unselectedData) => {
    errorWrap(
      async () => {
        /* We need to iterate through allLessons, and update the selected and _order fields */
        const updatedAllLessons = _.cloneDeep(allLessons)

        for (let i = 0; i < selectedData.length; i += 1) {
          const updatedIdx = updatedAllLessons.findIndex(
            (element) => element._id === selectedData[i]._id,
          )
          updatedAllLessons[updatedIdx].selected = true
          updatedAllLessons[updatedIdx]._order = i
        }

        for (let i = 0; i < unselectedData.length; i += 1) {
          const updatedIdx = updatedAllLessons.findIndex(
            (element) => element._id === unselectedData[i]._id,
          )
          updatedAllLessons[updatedIdx].selected = false
          updatedAllLessons[updatedIdx]._order = i
        }

        // Makes API request
        await updateLessons(currentCourseId, updatedAllLessons)
        // Updates Redux store
        dispatch(setField({ key: 'allLessons', value: updatedAllLessons }))
        // In the Redux store, updates the num_lessons field for the unit that these lessons belong to
        dispatch(updateNumLessons({ numSelected: selectedData.length }))
      },
      () => {
        // on success, go back
        navigation.goBack()
      },
    )
  }

  /**
   * Navigates to the Create Lesson modal
   */
  const add = () => {
    navigation.navigate('Modal', { screen: 'CreateLesson' })
  }

  return (
    <ManageView
      navigation={navigation}
      selectedTitleText="Selected Lessons"
      unselectedTitleText="Unselected Lessons"
      selectedBodyText="These lessons will be available to your students. Drag them around to reorder them."
      unselectedBodyText="These lessons are not included in your course. You can still continue to edit them."
      addText="Create Lessons"
      saveCallback={saveChanges}
      addCallback={add}
      initialSelectedData={selected}
      initialUnselectedData={unselected}
    />
  )
}

ManageLessons.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }),
}

ManageLessons.defaultProps = {
  navigation: { navigate: () => null, goBack: () => null },
}

export default ManageLessons
