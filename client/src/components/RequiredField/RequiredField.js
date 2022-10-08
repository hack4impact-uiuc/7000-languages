import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'native-base'
import { colors } from 'theme'

const RequiredField = ({ title, fontSize }) => (
  <Text fontSize={fontSize}>
    {title}
    <Text bold color={colors.red.dark} fontSize={fontSize}>
      {' *'}
    </Text>
  </Text>
)
RequiredField.propTypes = {
  title: PropTypes.string,
  fontSize: PropTypes.string,
}
RequiredField.defaultProps = {
  title: 'This field is required',
  fontSize: 'xl',
}

export default RequiredField
