import React from 'react'
import PropTypes from 'prop-types'
import StyledButton from 'components/StyledButton'

const ContributorButton = ({ isContributor }) => {
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
ContributorButton.propTypes = {
  isContributor: PropTypes.bool,
}

ContributorButton.defaultProps = {
  isContributor: false,
}

export default ContributorButton
