import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'native-base'
import { ViewPropTypes } from 'react-native'

const StyledButton = ({
  title,
  variant,
  onPress,
  leftIcon,
  rightIcon,
  fontSize,
  style,
}) => (
  <Button
    onPress={onPress}
    variant={variant}
    _text={{ fontSize }}
    leftIcon={leftIcon}
    endIcon={rightIcon}
    style={style}
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
  style: ViewPropTypes.style,
}

StyledButton.defaultProps = {
  title: 'Button',
  variant: 'primary',
  leftIcon: null,
  rightIcon: null,
  onPress: () => {},
  fontSize: 'lg',
  style: {},
}

export default StyledButton
