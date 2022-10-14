import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import Drawer from 'components/Drawer'
import { colors } from 'theme'
import { Input, Text, TextArea } from 'native-base'
import { Foundation } from '@expo/vector-icons'

import { useSelector, useDispatch } from 'react-redux'
import { addUnit } from 'slices/language.slice'
import { updateUnit } from 'api' //create updateunit
import { useErrorWrap } from 'hooks'
import RequiredField from 'components/RequiredField'

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    borderWidth: 0.5,
    padding: 8,
    marginBottom: 10,
    backgroundColor: colors.blue.light,
    borderColor: colors.blue.light,
  },
  textRow: {
    flexDirection: 'row',
  },
})

const UpdateUnit = ({ navigation }) => {
  const close = () => {
    navigation.goBack()
  }

  const errorWrap = useErrorWrap()
  const dispatch = useDispatch()
  const { currentCourseId } = useSelector((state) => state.language)

  const [name, setName] = useState('')
  const [purpose, setPurpose] = useState('')

  // checks if all fields are filled
  // otherwise, the submit button is disabled
  const areRequiredFieldsFilled = name !== '' && purpose !== ''

  /**
   * Posts a new unit to the API and saves the new unit in state
   */
  const success = async () => {
    errorWrap(
      async () => {
        const newUnit = {
          name,
          description: purpose,
          _course_id: currentCourseId,
          selected: true,
        }

        const { result } = await updateUnit(newUnit)
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
      <View
        style={{
          width: '97%',
          marginHorizontal: '1%',
          justifyContent: 'center',
        }}
      >
        <View style={styles.container}>
          <View style={styles.textRow}>
            <Foundation name="lightbulb" size={20} color={colors.blue.dark} />
            <Text
              fontSize="md"
              paddingBottom={2}
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
            When creating a unit, think about how it will be used. More text
            here explaining what they should look for when making a unit.
          </Text>
        </View>

        <RequiredField title="Change your unit name" />
        <Input
          size="xl"
          placeholder=""
          returnKeyType="done"
          onChangeText={(text) => setName(text)}
        />

        <RequiredField title="What is the purpose of this unit?" />
        <TextArea
          size="xl"
          h={40}
          placeholder=""
          keyboardType="default"
          returnKeyType="done"
          blurOnSubmit
          onChangeText={(text) => setPurpose(text)}
        />
      </View>
    </>
  )

  return (
    <Drawer
      titleText="Edit Unit"
      successText="Confirm Edit"
      successCallback={success}
      closeCallback={close}
      isDisabled={!areRequiredFieldsFilled}
      body={body}
    />
  )
}

UpdateUnit.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }),
}

UpdateUnit.defaultProps = {
  navigation: { navigate: () => null, goBack: () => null },
}

export default UpdateUnit