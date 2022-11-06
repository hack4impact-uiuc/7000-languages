import React from 'react'
import { Box } from 'native-base'
import { colors } from 'theme'
import PropTypes from 'prop-types'

const NumberBox = ({ number, learner, noMargin }) => (
  <Box
    bg={learner ? colors.blue.light : colors.red.light}
    w={37}
    h={37}
    rounded="lg"
    py="1"
    ml={noMargin ? 0 : 3}
    _text={{
      color: learner ? '#04AFB2' : '#DF4E47',
      textAlign: 'center',
      fontFamily: 'heading',
    }}
  >
    {number}
  </Box>
)

NumberBox.propTypes = {
  number: PropTypes.number,
  learner: PropTypes.bool,
  noMargin: PropTypes.bool,
}

NumberBox.defaultProps = {
  number: 1,
  learner: false,
  noMargin: false,
}

export default NumberBox
