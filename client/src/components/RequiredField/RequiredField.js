import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'native-base'
import { colors } from 'theme'

const RequiredField = ({ title }) => (
  <Text>
    {title}
    <Text bold color={colors.red.dark}>
      {' *'}
    </Text>
  </Text>
)
RequiredField.propTypes = {
  title: PropTypes.string,
}
RequiredField.defaultProps = {
  title: 'This field is required',
}

export default RequiredField
