import React from 'react'
import { Text } from 'native-base'

const HeaderTitle = () => (
  <Text
    style={{
      fontFamily: 'GT_Haptik_bold',
    }}
    fontWeight="regular"
    color="white.dark"
    fontSize="2xl"
  >
    Home
  </Text>
)

HeaderTitle.propTypes = {}
HeaderTitle.defaultProps = {}

export default HeaderTitle
