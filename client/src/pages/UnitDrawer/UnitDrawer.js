import React from 'react'
import PropTypes from 'prop-types'
import Drawer from 'components/Drawer'
import { Input, Text } from 'native-base'

const UnitDrawer = ({ navigation }) => {
  const close = () => {
    navigation.goBack()
  }

  const success = () => {
    console.log('success')
  }

  const body = (
    <>
      <Text>Give your unit a name</Text>
      <Input size="lg" variant="filled" placeholder="" />
    </>
  )

  return (
    <Drawer
      titleText="Add Custom Unit"
      successText="Create Unit"
      successCallback={success}
      closeCallback={close}
      body={body}
    />
  )
}

UnitDrawer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }),
}

UnitDrawer.defaultProps = {
  navigation: { navigate: () => null, goBack: () => null },
}

export default UnitDrawer
