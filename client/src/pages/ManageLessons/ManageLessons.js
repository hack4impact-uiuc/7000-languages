import React from 'react'
import PropTypes from 'prop-types'
import ManageView from 'components/ManageView'

const ManageLessons = ({ navigation }) => {
  const saveChanges = (selectedData, unselectedData) => {
    console.log(selectedData)
    console.log(unselectedData)
    navigation.goBack()
  }

  const add = () => {
    console.log('adding')
  }

  const sampleSelected = [
    { title: 'Selected 1', body: '2 Vocab Items', isComplete: true },
    { title: 'Selected 2', body: '5 Vocab Items', isComplete: false },
    { title: 'Selected 3', body: '2 Vocab Items', isComplete: true },
    { title: 'Selected 4', body: '5 Vocab Items', isComplete: false },
    { title: 'Selected 5', body: '2 Vocab Items', isComplete: true },
    { title: 'Selected 6', body: '5 Vocab Items', isComplete: false },
  ]

  const sampleUnselected = [
    { title: 'Unselected 1', body: '2 Vocab Items', isComplete: true },
    { title: 'Unselected 2', body: '5 Vocab Items', isComplete: true },
    { title: 'Unselected 3', body: '2 Vocab Items', isComplete: true },
    { title: 'Unselected 4', body: '5 Vocab Items', isComplete: true },
  ]

  return (
    <ManageView
      selectedTitleText="Selected Lessons"
      unselectedTitleText="Unselected Lessons"
      selectedBodyText="These lessons will be available to your students. Drag them around to reorder them."
      unselectedBodyText="These lessons are not included in your course. You can still continue to edit them."
      addText="Create Lessons"
      saveCallback={saveChanges}
      addCallback={add}
      initialSelectedData={sampleSelected}
      initialUnselectedData={sampleUnselected}
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
