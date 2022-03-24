import React from 'react'
import PropTypes from 'prop-types'
import ManageView from 'components/ManageView'

const ManageUnits = ({ navigation }) => {
    return (
        <ManageView selectedTitleText="Selected Units" unselectedTitleText="Unselected Units"
            selectedBodyText="These units will be available to your students. Drag them around to reorder them."
            unselectedBodyText="These units are not included in your course. You can still continue to edit them."
            addText="Add Unit" />
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