import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native'
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
  },
}

const StyleButton = ({
  title,
  width,
  height,
  color,
  backgroundColor,
  onPress,
  children,
  textStyle,
  style,
}) => {
  const btnStyle = [styles.root, { width, height, backgroundColor }, style]
  const txtStyle = [styles.text, { color }, textStyle]
  return (
    <TouchableOpacity onPress={onPress} style={btnStyle}>
      {title && <Text style={txtStyle}>{title}</Text>}
      {children}
    </TouchableOpacity>
  )
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
