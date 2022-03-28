import React from 'react'
import PropTypes from 'prop-types'
import ManageView from 'components/ManageView'

const ManageUnits = ({ navigation }) => {

    const saveChanges = (selectedData, unselectedData) => {
        alert("saved");
    }

    const add = () => {
        alert("adding");
    }

    const sampleSelected = [
        { title: "Selected 1", body: "2 Lessons", isComplete: true },
        { title: "Selected 2", body: "5 Lessons", isComplete: false },
        { title: "Selected 3", body: "2 Lessons", isComplete: true },
        { title: "Selected 4", body: "5 Lessons", isComplete: false },
        { title: "Selected 5", body: "2 Lessons", isComplete: true },
        { title: "Selected 6", body: "5 Lessons", isComplete: false },
    ]

    const sampleUnselected = [
        { title: "Unselected 1", body: "2 Lessons", isComplete: true },
        { title: "Unselected 2", body: "5 Lessons", isComplete: false },
        { title: "Unselected 3", body: "2 Lessons", isComplete: true },
        { title: "Unselected 4", body: "5 Lessons", isComplete: false },
    ]

    return (
        <ManageView selectedTitleText="Selected Units" unselectedTitleText="Unselected Units"
            selectedBodyText="These units will be available to your students. Drag them around to reorder them."
            unselectedBodyText="These units are not included in your course. You can still continue to edit them."
            addText="Add Unit"
            saveCallback={saveChanges}
            addCallback={add}
            initialSelectedData={sampleSelected}
            initialUnselectedData={sampleUnselected}
        />
    )
}

ManageView.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }),
}

ManageUnits.defaultProps = {
    navigation: { navigate: () => null },
}

export default ManageUnits