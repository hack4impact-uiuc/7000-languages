import React from 'react'
import PropTypes from 'prop-types'
import { Button } from "native-base"
import { colors } from 'theme'
import { Text } from "native-base"

const StyledButton = ({
  title,
  variant,
  _text,
  onPress,
}) => {

    return (
  

<Button onPress={onPress} variant={variant} _text={_text}> 
{title}
</Button>
    );
  }
// Button object fields 
StyledButton.propTypes = {
  title: PropTypes.string,
  variant: PropTypes.string,
  onPress: PropTypes.func,
  _text: PropTypes.string,
  fontSize: PropTypes.string,
}

StyledButton.defaultProps = {
  title: 'Button',
  variant: 'primary', 
  onPress: () => {},  
}

export default StyledButton