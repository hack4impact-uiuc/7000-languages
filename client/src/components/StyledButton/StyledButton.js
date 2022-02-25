import React from 'react'
import PropTypes from 'prop-types'
import { Button } from "native-base"
import { colors } from 'theme'
import { Text } from "native-base"

const StyledButton = ({
  title,
  variants,
  onPress,
}) => {

    return (
  

<Button onPress={onPress} variants={variants}> 
{title}
</Button>
    );
  }
// Button object fields 
StyledButton.propTypes = {
  title: PropTypes.string,
  colorScheme: PropTypes.string,
  variants: PropTypes.string,
  onPress: PropTypes.func,
}

StyledButton.defaultProps = {
  title: 'Button', 
  variant: "primary",
  onPress: () => {},  
}

export default StyledButton