import React, { useState } from 'react'
import { colors } from 'theme'
import { Text, Input, Image, InputRightAddon } from 'native-base'
import { StyleSheet, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { images } from 'theme'

import i18n from 'utils/i18n'

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
  logo: {
    position: 'absolute',
    right: '5%',
    top: '5%',
  },
  cancelButton: {
    paddingRight: '3%',
    color: colors.blue.dark,
  },
  welcomeText: {
    color: colors.gray.dark,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

const LearnerSearch = () => {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
  <View style={{ flex: 1 }}>
    <View style={styles.search}>
      <Input
        height="25%"
        borderRadius={10}
        placeholderTextColor={colors.blue.dark}
        placeholder="Search Courses"
        backgroundColor={colors.blue.light}
        
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setSearchFocused(false)}
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

    {/* <Image alignSelf='center' source={images.logo_sm}  alt={"7000 languages logo"}/> */}
    {/* <Text style={styles.welcomeText}>{i18n.t("dict.searchWelcome")}</Text> */}
  </View>

  )
}

export default LearnerSearch
