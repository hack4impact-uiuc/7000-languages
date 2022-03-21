import React from 'react'
import PropTypes from 'prop-types'
<<<<<<< HEAD
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
=======
import { Button } from 'native-base'

const StyledButton = ({
  title, variant, onPress, leftIcon,
}) => (
  <Button
    onPress={onPress}
    variant={variant}
    _text={{ fontSize: 'lg' }}
    leftIcon={leftIcon}
  >
    {title}
  </Button>
)
// Button object fields
>>>>>>> dev
StyledButton.propTypes = {
  title: PropTypes.string,
  variant: PropTypes.string,
  onPress: PropTypes.func,
<<<<<<< HEAD
  fontSize: PropTypes.string,
  leftIcon: PropTypes.string
=======
  leftIcon: PropTypes.element,
>>>>>>> dev
}

StyledButton.defaultProps = {
  title: 'Button',
<<<<<<< HEAD
  variant: 'primary', 
  onPress: () => {},  
}

export default StyledButton
=======
  variant: 'primary',
  leftIcon: null,
  onPress: () => {},
}

export default StyledButton
>>>>>>> dev
