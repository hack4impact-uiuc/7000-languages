import React from 'react'
import PropTypes from 'prop-types'
import { Button } from "native-base"
import { colors } from 'theme'

const StyleButton = ({
  title,
  type,
  width,
  height,
  color,
  backgroundColor,
  onPress,
  children,
  textStyle,
  style,
}) => {
  const btnStyle = [styles.primary, { width, height, backgroundColor }, style]
  const txtStyle = [styles.text, { color }, textStyle]
  function StyleButton(props) {
    const { onPress, title, children, type } = props;

    // can make this more concise 
    if (type === 'Primary') {
      btnStyle = [styles.primary, { width, height, backgroundColor }, style]
    } else if (type === 'Secondary') {
      btnStyle = [styles.secondary, { width, height, backgroundColor }, style]
    } else if (type === 'Transparent') {
      btnStyle = [styles.transparent, { width, height, backgroundColor }, style]
    }

    return (
  

<TouchableOpacity onPress={onPress} style={btnStyle}>
{title && <Text style={txtStyle}>{title}</Text>}
{children}
</TouchableOpacity>
    );
  }
}

const styles = {
  primary: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    color: colors.red
  },
  secondary: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    color: colors.blue 
  },
  transparent: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    color: colors.transparent
  },
  

  text: {
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: 'regular' 
  },
}


// Button object fields 
StyleButton.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  onPress: PropTypes.func,
  children: PropTypes.string,
  textStyle: PropTypes.shape({}),
  style: PropTypes.shape({}),
}

StyleButton.defaultProps = {
  title: 'Button',
  width: 'auto',
  height: 'auto',
  color: 'black',
  type: 'Primary', 
  backgroundColor: colors.lightRed, 
  onPress: () => {},
  children: null,
  textStyle: {},
  style: {},
}

export default StyleButton