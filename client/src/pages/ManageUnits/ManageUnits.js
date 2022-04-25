import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ManageView from 'components/ManageView'

import useErrorWrap from 'hooks/useErrorWrap'
import { useSelector, useDispatch } from 'react-redux'
import { setAllUnits } from 'slices/language.slice'
import { updateUnits } from 'api'

const ManageUnits = ({ navigation }) => {
  const errorWrap = useErrorWrap()
  const dispatch = useDispatch()
  const { allUnits, currentCourseId } = useSelector((state) => state.language)

  const [selected, setSelected] = useState([])
  const [unselected, setUnselected] = useState([])

  useEffect(() => {
    let selectedList = []
    let unselectedList = []

    for (let i = 0; i < allUnits.length; i += 1) {
      const item = allUnits[i]

      const formattedItem = {
        _id: item._id,
        title: item.name,
        body: `${item.num_lessons} ${
          item.num_vocab === 1 ? 'Lesson' : 'Lessons'
        }`,
        isComplete: true,
      }

      if (item.selected) {
        selectedList.push(formattedItem)
      } else {
        selectedList.push(formattedItem)
      }
    }

    selectedList = selectedList.sort((a, b) => a._order - b._order)
    unselectedList = unselectedList.sort((a, b) => a._order - b._order)

    setSelected(selectedList)
    setUnselected(unselectedList)
  }, [allUnits])

  const saveChanges = async (selectedData, unselectedData) => {
    errorWrap(
      async () => {
        const updates = selectedData.concat(unselectedData)
        const { result } = await updateUnits(currentCourseId, updates)

        dispatch(setAllUnits({ allUnits: result }))
      },
      () => {
        // on success, go back
        navigation.goBack()
      },
    )
  }

  const add = () => {
    navigation.navigate('Modal', { to: 'CreateUnit' })
  }

  return (
    <ManageView
      selectedTitleText="Selected Units"
      unselectedTitleText="Unselected Units"
      selectedBodyText="These units will be available to your students. Drag them around to reorder them."
      unselectedBodyText="These units are not included in your course. You can still continue to edit them."
      addText="Create Unit"
      saveCallback={saveChanges}
      addCallback={add}
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
