import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import Drawer from 'components/Drawer'
import { colors } from 'theme'
import { Input, Text, TextArea } from 'native-base'
import { Foundation } from '@expo/vector-icons'

import { useSelector, useDispatch } from 'react-redux'
import { addUnit } from 'slices/language.slice'
import { createUnit } from 'api'
import useErrorWrap from 'hooks/useErrorWrap'

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

  const errorWrap = useErrorWrap()
  const dispatch = useDispatch()
  const { currentCourseId } = useSelector((state) => state.language)

  const [name, setName] = useState('')
  const [purpose, setPurpose] = useState('')

  /**
   * Posts a new unit to the API and saves the new unit in state
   */
  const success = async () => {
    errorWrap(
      async () => {
        const newLesson = {
          name,
          description: purpose,
          course_id: currentCourseId,
          selected: true,
        }

        const { result } = await createUnit(newLesson)
        dispatch(addUnit({ unit: result }))
      },
      () => {
        // on success, close the modal
        close()
      },
    )
  }

  const body = (
    <>
      <View style={styles.container}>
        <View style={styles.textRow}>
          <Foundation name="lightbulb" size={24} color={colors.blue.dark} />
          <Text
            fontFamily="heading"
            fontWeight="regular"
            fontStyle="normal"
            color={colors.blue.dark}
          >
            {' '}
            Suggestion{' '}
          </Text>
        </View>
        <Text color={colors.blue.dark} fontSize="md">
          When creating a unit, think about how it will be used. More text here
          explaining what they should look for when making a unit.
        </Text>
      </View>

      <Text>Give your unit a name</Text>
      <Input
        size="xl"
        placeholder=""
        returnKeyType="done"
        onChangeText={(text) => setName(text)}
      />

      <Text>What is the purpose of this unit?</Text>

      <TextArea
        size="xl"
        h={40}
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
