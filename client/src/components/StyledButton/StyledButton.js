import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'native-base'

const StyledButton = ({
  title,
  variant,
  onPress,
  leftIcon,
  rightIcon,
  fontSize,
  shadow,
  style,
  isDisabled,
}) => (
  <Button
    onPress={onPress}
    variant={variant}
    _text={{ fontSize }}
    leftIcon={leftIcon}
    endIcon={rightIcon}
    shadow={shadow === true ? 4 : -1}
    style={style}
    isDisabled={isDisabled}
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
  rightIcon: PropTypes.element,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  shadow: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.string),
  isDisabled: PropTypes.bool,
}

StyledButton.defaultProps = {
  title: 'Button',
  variant: 'primary',
  leftIcon: null,
  rightIcon: null,
  onPress: () => {},
  fontSize: 'lg',
  shadow: false,
  style: {},
  isDisabled: false,
}

export default StyledButton
