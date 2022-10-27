import React from 'react'
import PropTypes from 'prop-types'
import StyledButton from 'components/StyledButton'

const LearnerButton = ({ isContributor }) => {
  switch (isContributor) {
    case true:
      return (
        <StyledButton title="LEARNER" variant="learner" fontSize="12" />
      )
    default:
      return null
  }
}

// Button object fields
LearnerButton.propTypes = {
  isContributor: PropTypes.bool,
}

LearnerButton.defaultProps = {
  isContributor: false,
}

export default LearnerButton
