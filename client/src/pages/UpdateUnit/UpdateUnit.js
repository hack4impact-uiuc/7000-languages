import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'
import Drawer from 'components/Drawer'
import { colors } from 'theme'
import { Input, Text, TextArea } from 'native-base'
import { Foundation } from '@expo/vector-icons'
import { useSelector, useDispatch } from 'react-redux'
import { patchSelectedUnit } from 'slices/language.slice'
import { updateUnit } from 'api'
import { useErrorWrap } from 'hooks'
import RequiredField from 'components/RequiredField'
import i18n from 'utils/i18n'

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
  const { currentCourseId, currentUnitId, allUnits } = useSelector(
    (state) => state.language,
  )

  const [name, setName] = useState('')
  const [purpose, setPurpose] = useState('')

  // checks if all fields are filled
  // otherwise, the submit button is disabled
  const areRequiredFieldsFilled = name !== '' && purpose !== ''

  useEffect(() => {
    const unitIndex = allUnits.findIndex(
      (element) => element._id === currentUnitId,
    )
    const unitData = allUnits[unitIndex]

    setName(unitData.name)
    setPurpose(unitData.description)
  }, [currentUnitId, allUnits])

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

        const { result } = await updateUnit(currentUnitId, newUnit)

        dispatch(patchSelectedUnit({ unit: result }))
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
              {i18n.t('dict.suggestion')}{' '}
            </Text>
          </View>
          <Text color={colors.blue.dark} fontSize="md">
            {i18n.t('dialogue.updateUnit')}
          </Text>
        </View>

        <RequiredField
          title={i18n.t('dialogue.changeUnitName')}
          fontSize="md"
        />
        <Input
          size="xl"
          placeholder=""
          returnKeyType="done"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <RequiredField title={i18n.t('dialogue.unitPurpose')} fontSize="md" />
        <TextArea
          size="xl"
          h={40}
          placeholder=""
          keyboardType="default"
          returnKeyType="done"
          blurOnSubmit
          value={purpose}
          onChangeText={(text) => setPurpose(text)}
        />
      </View>
    </>
  )

  return (
    <Drawer
      titleText={i18n.t('actions.editUnit')}
      successText={i18n.t('actions.confirmEdit')}
      successCallback={success}
      closeCallback={close}
      areAllFieldsFilled={areRequiredFieldsFilled}
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
