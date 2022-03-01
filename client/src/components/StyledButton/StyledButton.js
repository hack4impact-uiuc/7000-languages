import React from 'react'
import PropTypes from 'prop-types'
import { Button } from "native-base"
import { colors } from 'theme'
import { Text } from "native-base"

const StyledButton = ({
  title,
  variant,
  onPress,
  leftIcon,
}) => {

    return (
  

<Button onPress={onPress} variant={variant} _text={{fontSize: "lg"}} leftIcon={leftIcon} > 
{title}
</Button>
    );
  }
// Button object fields 
StyledButton.propTypes = {
  title: PropTypes.string,
  variant: PropTypes.string,
  onPress: PropTypes.func,
  fontSize: PropTypes.string,
  leftIcon: PropTypes.string
}

StyledButton.defaultProps = {
  title: 'Button',
  variant: 'primary', 
  onPress: () => {},  
}

export default StyledButton