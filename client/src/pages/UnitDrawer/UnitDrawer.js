import React from 'react'
import PropTypes from 'prop-types'
import Drawer from 'components/Drawer'

const UnitDrawer = ({ navigation }) => {
    const close = () => {
        alert("trying to close!");
    }

    return <Drawer closeCallback={close} />
}


UnitDrawer.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func,
    }),
}

UnitDrawer.defaultProps = {
    navigation: { navigate: () => null },
}

export default UnitDrawer
