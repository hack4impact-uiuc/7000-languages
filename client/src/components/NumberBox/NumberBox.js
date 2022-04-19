import React from 'react'
import { Box } from 'native-base'
import { colors } from 'theme'
import PropTypes from 'prop-types'

const NumberBox = ({number}) => {
 
      return (
        <Box
        bg={colors.red.light}
        w={37}
        h={37}
        rounded='lg'
        py='1'
        ml={3}
        _text={{
            color:'#DF4E47',
            textAlign: 'center',  
        }}
        >
        {number}
        </Box>
      )
  
}

NumberBox.propTypes = {
    number: PropTypes.number
}

NumberBox.defaultProps = {
    number: 1
}

export default NumberBox
