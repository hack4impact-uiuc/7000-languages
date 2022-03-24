import React from 'react'
import PropTypes from 'prop-types'
import ManageView from 'components/ManageView'

const ManageUnits = ({ navigation }) => {
    return (
        <ManageView />
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