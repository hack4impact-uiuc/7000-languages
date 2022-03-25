import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'native-base'

const StyledButton = ({
  title, variant, onPress, leftIcon, rightIcon
}) => (
  <Button
    onPress={onPress}
    variant={variant}
    _text={{ fontSize: 'xl' }}
    leftIcon={leftIcon}
    endIcon={rightIcon}
  >
    {title}
  </Button>
)
// Button object fields
StyledButton.propTypes = {
  title: PropTypes.string,
  variant: PropTypes.string,
  onPress: PropTypes.func,
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element
}

StyledButton.defaultProps = {
  title: 'Button',
  variant: 'primary',
  leftIcon: null,
  rightIcon: null,
  onPress: () => { },
}

export default StyledButton
