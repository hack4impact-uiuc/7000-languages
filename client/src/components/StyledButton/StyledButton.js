import React from 'react'
import PropTypes from 'prop-types'
import { Button } from "native-base"
import { colors } from 'theme'
import { TouchableOpacity } from 'react-native'
import { Text } from "native-base"

const StyledButton = ({
  title,
  type,
  onPress,
}) => {
  var btnStyle = [styles.primary]
  const txtStyle = [styles.text]

    // can make this more concise 
    if (type === 'Primary') {
      btnStyle = [styles.primary]
    } else if (type === 'Secondary') {
      btnStyle = [styles.secondary]
    } else if (type === 'Transparent') {
      btnStyle = [styles.transparent]
    }

    return (
  

<TouchableOpacity onPress={onPress} style={btnStyle}>
{title && <Text style={txtStyle}>{title}</Text>}
</TouchableOpacity>
    );
  }


const styles = {
  primary: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 5,
    backgroundColor: colors.red
  },
  secondary: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    backgroundColor: colors.blue 
  },
  transparent: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    backgroundColor: colors.transparent
  },

  text: {
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: 'regular' 
  },
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