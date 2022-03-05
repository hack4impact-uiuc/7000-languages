import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'native-base'

const StyledButton = ({ title, variant, onPress, leftIcon }) => {
  return (
    <Button
      onPress={onPress}
      variant={variant}
      _text={{ fontSize: 'lg' }}
      leftIcon={leftIcon}
    >
      {title}
    </Button>
  )
}
// Button object fields
StyledButton.propTypes = {
  title: PropTypes.string,
  variant: PropTypes.string,
  onPress: PropTypes.func,
  leftIcon: PropTypes.element,
}

StyledButton.defaultProps = {
  title: 'Button',
  variant: 'primary',
  leftIcon: null,
  onPress: () => { },
}

export default StyledButton
