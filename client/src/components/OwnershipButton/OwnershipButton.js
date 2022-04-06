import React from 'react'
import PropTypes from 'prop-types'
import StyledButton from 'components/StyledButton'

const OwnershipButton = ({ isContributor }) => {
  switch (isContributor) {
    case true:
      return (
        <StyledButton
          title="CONTRIBUTOR"
          // add variant in nativebase
          variant="contributor"
          fontSize="8"
        />
      )
    default:
      return null
  }
}

// Button object fields
OwnershipButton.propTypes = {
  isContributor: PropTypes.bool,
}

OwnershipButton.defaultProps = {
  isContributor: false,
}

export default OwnershipButton
