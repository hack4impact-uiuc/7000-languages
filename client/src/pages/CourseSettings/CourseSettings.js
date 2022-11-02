import React, { useState } from 'react'
import { Text, Select } from 'native-base'
import { StyleSheet, View } from 'react-native'
import i18n from 'utils/i18n'

const styles = StyleSheet.create({
  description: {
    marginTop: 10,
    marginBottom: 20,
    marginLeft: '3%', // i think there's a better way to do this
    width: '95%',
    height: 'auto',
  },
  visibility: {
    marginLeft: '5%',
    width: '90%',
    height: 'auto',
  },
})

const CourseSettings = () => {
  const [selected, setSelected] = useState('public') // TODO get this from the API
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.description}>
        <Text
          fontFamily="body"
          fontWeight="normal"
          fontSize="md"
          color="gray.medium"
        >
          {i18n.t('dialogue.courseSettingsDescription')}
        </Text>
      </View>
      <View style={styles.visibility}>
        <Text fontFamily="heading" fontWeight="regular" fontSize="lg">
          {i18n.t('dict.privacy')}
        </Text>
        <Select
          style={styles.visibility}
          defaultValue={selected}
          borderColor="black"
          height="38%"
          onValueChange={setSelected}
        >
          <Select.Item label={i18n.t('dict.private')} value="private" />
          <Select.Item label={i18n.t('dict.public')} value="public" />
        </Select>
      </View>
    </View>
  )
}

export default CourseSettings
