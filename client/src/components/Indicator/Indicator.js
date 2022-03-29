import React from 'react'
import PropTypes from 'prop-types'
import StyledButton from 'components/StyledButton'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { colors } from 'theme'

const Indicator = ({ isComplete }) => {
  switch (isComplete) {
    case true:
      return (
        <StyledButton
          title="COMPLETE"
          variant="complete"
          rightIcon={(
            <AntDesign
              name="checkcircle"
              size={12}
              color={colors.green.medium}
            />
          )}
          fontSize="10"
        />
      )
    case false:
      return (
        <StyledButton
          title="INCOMPLETE"
          variant="incomplete"
          rightIcon={
            <Ionicons name="warning" size={12} color={colors.orange.medium} />
          }
          fontSize="10"
        />
      )
    default:
      return null
  }
}

// Button object fields
Indicator.propTypes = {
  isComplete: PropTypes.bool,
}

Indicator.defaultProps = {
  isComplete: false,
}

export default Indicator
