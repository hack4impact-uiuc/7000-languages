import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ManageView from 'components/ManageView'

import useErrorWrap from 'hooks/useErrorWrap'
import { useSelector, useDispatch } from 'react-redux'
import { setField } from 'slices/language.slice'
import { updateLessons } from 'api'

const ManageLessons = ({ navigation }) => {
  const errorWrap = useErrorWrap()
  const dispatch = useDispatch()
  const { allLessons, currentCourseId } = useSelector((state) => state.language)

  const [selected, setSelected] = useState([])
  const [unselected, setUnselected] = useState([])

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
  }, [allLessons])

  const saveChanges = async (selectedData, unselectedData) => {
    errorWrap(
      async () => {
        const updates = selectedData.concat(unselectedData)
        const { result } = await updateLessons(currentCourseId, updates)

        dispatch(setField({ key: 'allLessons', value: result }))
      },
      () => {
        // on success, go back
        navigation.goBack()
      },
    )
  }

  const add = () => {
    navigation.navigate('Modal', { to: 'CreateLesson' })
  }

  return (
    <ManageView
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
