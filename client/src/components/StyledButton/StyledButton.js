import React from 'react'
import PropTypes from 'prop-types'
import { Button } from "native-base"
import { colors } from 'theme'
import { Text } from "native-base"

const StyledButton = ({
  title,
  type,
  onPress,
}) => {

    return (
  

<Button onPress={onPress} variant={type}> 
{title}
</Button>
    );
  }




// Button object fields 
StyledButton.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  onPress: PropTypes.func,
}

StyledButton.defaultProps = {
  title: 'Button',
  type: 'Primary', 
  onPress: () => {},
}

export default StyledButton