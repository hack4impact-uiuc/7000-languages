import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'native-base'

const styles = StyleSheet.create({
  logo: {
    width: 32,
    height: 32,
  },
})

const HeaderTitle = () => <Text
  style={{
  fontFamily: 'GT_Haptik_bold',
  }}
  fontWeight="regular"
  color="white.dark"
  fontSize="2xl"
>
Home
</Text>

HeaderTitle.propTypes = {}
HeaderTitle.defaultProps = {}

export default HeaderTitle
