import React from 'react'
import PropTypes from 'prop-types'
import StyledButton from 'components/StyledButton'

const OwnershipButton = ({ isContributor }) => {
  switch (isContributor) {
    case true:
      return (
        <StyledButton title="CONTRIBUTOR" variant="contributor" fontSize="12" />
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
