import React from 'react'
import PropTypes from 'prop-types'
import { Button } from "native-base"
import { colors } from 'theme'

const styles = {
  root: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: 'regular' 
  },
}

const StyleButton = ({
  text,
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
  export default function StyleButton(props) {
    const { onPress, text, children, type } = props;

    // can make this more concise 
    if (type === 'Primary') {
      btnStyle = [styles.primary, { width, height, backgroundColor }, style]
    } else if (type === 'Secondary') {
      btnStyle = [styles.secondary, { width, height, backgroundColor }, style]
    } else if (type === 'Transparent') {
      btnStyle = [styles.transparent, { width, height, backgroundColor }, style]
    }

    return (
      <Pressable style={btnStyle} onPress={onPress}>
        <Text style={txtStyle}>{text}</Text>
      </Pressable>
    );
  }
}

StyleButton.propTypes = {
  title: PropTypes.string,
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
  title: null,
  width: 'auto',
  height: 'auto',
  color: 'black',
  backgroundColor: colors.lightRed, 
  onPress: () => {},
  children: null,
  textStyle: {},
  style: {},
}

export default StyleButton