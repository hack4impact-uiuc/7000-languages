import React, { useState } from 'react'
import { Text, Select, Divider } from 'native-base'
import StyledButton from 'components/StyledButton'
import { Alert, StyleSheet, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import i18n from 'utils/i18n'

const styles = StyleSheet.create({
  description: {
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: '3%',
    width: '95%',
    height: 'auto',
  },
  body: {
    marginHorizontal: '5%',
    width: '90%',
  },
  delete: {
    position: 'absolute',
    bottom: '0%',
    width: '90%',
  },
})

const CourseSettings = () => {
  const [visibility, setVisibility] = useState('public') // TODO: get this from the API
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
      <View style={styles.body}>
        <Text fontFamily="heading" fontWeight="regular" fontSize="lg">
          {i18n.t('dict.privacy')}
        </Text>
        <Select
          defaultValue={visibility}
          borderColor="black"
          height="35%"
          onValueChange={setVisibility}
        >
          <Select.Item label={i18n.t('dict.public')} value="public" />
          <Select.Item label={i18n.t('dict.private')} value="private" />
        </Select>
      </View>
      {visibility === 'private' && (
        <View style={styles.body}>
          <Text fontFamily="heading" fontWeight="regular" fontSize="lg">
            {i18n.t('dict.securityCode')}
          </Text>
          <Text
            fontFamily="body"
            fontWeight="normal"
            fontSize="2xl"
            textAlign="right"
            my="5"
          >
            {123456} {/* TODO: get this from the API */}
          </Text>
          <Divider />
        </View>
      )}
      <StyledButton
        style={styles.delete}
        variant="settings"
        title={i18n.t('dict.deleteCourse')}
        leftIcon={
          <MaterialCommunityIcons name="delete" color="black" size={20} />
        }
        onPress={() => Alert.alert(
          'Are you sure you want to delete this course?',
          'This action cannot be undone.',
          [
            { text: 'Cancel' },
            {
              text: 'Delete',
              onPress: () => {
                /* TODO: delete course */
              },
            },
          ],
        )}
      />
    </View>
  )
}

export default CourseSettings
