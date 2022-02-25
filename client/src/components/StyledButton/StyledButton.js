import React from 'react'
import PropTypes from 'prop-types'
import { Button } from "native-base"
import { colors } from 'theme'
import { Text } from "native-base"

const StyledButton = ({
  title,
  colorScheme,
  variant,
  onPress,
}) => {

    return (
  

<Button onPress={onPress} colorScheme={colorScheme} variant={variant}> 
{title}
</Button>
    );
  }
// Button object fields 
StyledButton.propTypes = {
  title: PropTypes.string,
  colorScheme: PropTypes.string,
  variant: PropTypes.string,
  onPress: PropTypes.func,
}

StyledButton.defaultProps = {
  title: 'Button',
  colorScheme: 'primary', 
  variant: "solid",
  onPress: () => {},  
}

export default StyledButton