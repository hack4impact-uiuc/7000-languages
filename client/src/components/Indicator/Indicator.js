import React from 'react'
import PropTypes from 'prop-types'
import StyledButton from 'components/StyledButton'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { colors } from 'theme'
import { INDICATOR_TYPES } from 'utils/constants'

const Indicator = ({ indicatorType }) => {
  switch (indicatorType) {
    case INDICATOR_TYPES.COMPLETE:
      return (
        <StyledButton
          title="COMPLETE"
          variant="complete"
          rightIcon={
            <AntDesign
              name="checkcircle"
              size={12}
              color={colors.green.medium}
            />
          }
          fontSize="10"
        />
      )
    case INDICATOR_TYPES.INCOMPLETE:
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
    case INDICATOR_TYPES.NONE:
      return null
    default:
      return null
  }
}

// Button object fields
Indicator.propTypes = {
  indicatorType: PropTypes.number,
}

Indicator.defaultProps = {
  indicatorType: INDICATOR_TYPES.COMPLETE,
}

export default Indicator
