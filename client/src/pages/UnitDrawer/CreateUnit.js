import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import Drawer from 'components/Drawer'
import { colors } from 'theme'
import {
  Input,
  Text,
  TextArea,
} from 'native-base'
import { Foundation } from '@expo/vector-icons'

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    borderWidth: 0.5,
    padding: 5,
    backgroundColor: colors.blue.light,
    borderColor: colors.blue.light,
  },
  textRow: {
    flexDirection: 'row',
  },
})

const CreateUnit = ({ navigation }) => {
  const close = () => {
    navigation.goBack()
  }

  const [name, setName] = useState('')
  const [purpose, setPurpose] = useState('')

  const success = () => {
    const newUnit = {
      name,
      purpose,
    }
    console.log(newUnit, 'success!')
  }

  const body = (
    <>
      <View
        style={styles.container}
      >
        <View style={styles.textRow}>
          <Foundation name="lightbulb" size={24} color={colors.blue.dark} />
          <Text
            style={{
              fontFamily: 'GT_Haptik_bold',
            }}
            color={colors.blue.dark}
          >
            {' '}
            Suggestion{' '}
          </Text>
        </View>
        <Text color={colors.blue.dark} fontSize="md">
          When creating a unit, think about how it will be used. More text here explaining what they should look for when making a unit.
        </Text>
      </View>

      <Text>Give your unit a name</Text>
      <Input
        size="lg"
        variant="filled"
        placeholder=""
        returnKeyType="done"
        onChangeText={(text) => setName(text)}
      />

      <Text>What is the purpose of this unit?</Text>

      <TextArea
        size="2xl"
        h={40}
        variant="filled"
        placeholder=""
        keyboardType="default"
        returnKeyType="done"
        blurOnSubmit
        onChangeText={(text) => setPurpose(text)}
      />
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

CreateUnit.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }),
}

CreateUnit.defaultProps = {
  navigation: { navigate: () => null, goBack: () => null },
}

export default CreateUnit
