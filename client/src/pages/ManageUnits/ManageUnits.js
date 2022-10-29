import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ManageView from 'components/ManageView'

import { useErrorWrap } from 'hooks'
import { useSelector, useDispatch } from 'react-redux'
import { setField, updateNumUnits } from 'slices/language.slice'
import { updateUnits } from 'api'
import _ from 'lodash'
import { INDICATOR_TYPES } from 'utils/constants'
import i18n from 'utils/i18n'

const ManageUnits = ({ navigation }) => {
  const errorWrap = useErrorWrap()
  const dispatch = useDispatch()
  const { allUnits, currentCourseId } = useSelector((state) => state.language)

  const [selected, setSelected] = useState([])
  const [unselected, setUnselected] = useState([])

  /**
   * Filers all of the units into selected and unselected lists
   */
  useEffect(() => {
    let selectedList = []
    let unselectedList = []

    for (let i = 0; i < allUnits.length; i += 1) {
      const item = allUnits[i]

      const formattedItem = {
        _id: item._id,
        title: item.name,
        body: `${item.num_lessons} ${
          item.num_vocab === 1
            ? `${i18n.t('dict.lessonSingle')}`
            : `${i18n.t('dict.lessonPlural')}`
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

    // Units have order, so we must sort them before they are saved to local state
    selectedList = selectedList.sort((a, b) => a._order - b._order)
    unselectedList = unselectedList.sort((a, b) => a._order - b._order)

    setSelected(selectedList)
    setUnselected(unselectedList)
  }, [allUnits])

  /**
   * Calls API in order to update unit data
   * @param {*} selectedData List of Unit objects that are marked as selected
   * @param {*} unselectedData List of unit objects that are marked as unselected
   */
  const saveChanges = async (selectedData, unselectedData) => {
    errorWrap(
      async () => {
        /* We need to iterate through allUnits, and update the selected and _order fields */
        const updatedAllUnits = _.cloneDeep(allUnits)

        for (let i = 0; i < selectedData.length; i += 1) {
          const updatedIdx = updatedAllUnits.findIndex(
            (element) => element._id === selectedData[i]._id,
          )
          updatedAllUnits[updatedIdx].selected = true
          updatedAllUnits[updatedIdx]._order = i
        }

        for (let i = 0; i < unselectedData.length; i += 1) {
          const updatedIdx = updatedAllUnits.findIndex(
            (element) => element._id === unselectedData[i]._id,
          )
          updatedAllUnits[updatedIdx].selected = false
          updatedAllUnits[updatedIdx]._order = i
        }

        // Makes API request
        await updateUnits(currentCourseId, updatedAllUnits)

        // Updates Redux store
        dispatch(setField({ key: 'allUnits', value: updatedAllUnits }))
        // In the Redux store, updates the num_units field for the course that these units belong to
        dispatch(updateNumUnits({ numSelected: selectedData.length }))
      },
      () => {
        // on success, go back
        navigation.goBack()
      },
    )
  }

  return (
    <ManageView
      navigation={navigation}
      selectedTitleText={i18n.t('dict.selectedUnits')}
      unselectedTitleText={i18n.t('dict.unselectedUnits')}
      selectedBodyText={i18n.t('dialogue.selectedUnitsPrompt')}
      unselectedBodyText={i18n.t('dialogue.unselectedUnitsPrompt')}
      saveCallback={saveChanges}
      initialSelectedData={selected}
      initialUnselectedData={unselected}
    />
  )
}

ManageUnits.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }),
}

ManageUnits.defaultProps = {
  navigation: { navigate: () => null, goBack: () => null },
}

export default ManageUnits
