import React from 'react'
import { colors } from 'theme'
import { Text, Input, Image } from 'native-base'
import { StyleSheet, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

const styles = StyleSheet.create({
  search: {
    marginTop: '3%',
    width: '90%',
    py: '1',
    px: '2',
    alignSelf: 'center',
    variant: 'filled',
    color: colors.blue.medium,
  },
})

const LearnerSearch = () => (
  <View style={{ flex: 1 }}>
    <View style={styles.search}>
      <Input
        height="25%"
        borderRadius={10}
        placeholderTextColor={colors.blue.dark}
        placeholder="Search Courses"
        backgroundColor={colors.blue.light}
        InputLeftElement={(
          <AntDesign
            name="search1"
            size={24}
            color={colors.blue.dark}
            style={{ paddingLeft: '3%' }}
          />
          )}
      />
    </View>

  </View>
)

export default LearnerSearch
