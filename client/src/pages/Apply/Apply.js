import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, StatusBar } from 'react-native'
import StyledButton from 'components/StyledButton'
import { colors } from 'theme'
import { Text, ScrollView, Input, Stack} from 'native-base'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    color: 'black',
  },
  header: {
    flex: 2,
    bottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subhead: {
    
    flex: 4,
    bottom:30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    left: 1,
  },
  submitForm: {
    flex: 3,
    bottom:50 ,
    alignItems: 'center',
  },
  scrollView: {
    flex: 8,
    width: "90%",
    height: "100%",
    marginHorizontal: 100,
  },
  input: {
    height: 60,
    margin: 12,
    borderWidth: 1,
    padding: 20,
  },
})

const Apply = ({ navigation }) => {
  // applicaton fields
  const [name, setName] = useState(' ')
  const [email, setEmail] = useState(' ')
  const [language, setLanguage] = useState(' ')
  const [otherNames, setOtherNames] = useState(' ')

  // should this be string?? Can check DB later
  const [isoCode, setIsoCode] = useState(' ')

  return (
    <View style={styles.root}>
    
      <View style={styles.header}>
        <Text
          style={{
            fontFamily: 'GT_Haptik_bold',
          }}
          fontWeight="bold"
          color="black"
          fontStyle="regular"
          fontSize="md"
        >
          Thanks for your interest in contributing a language.
        </Text>
      </View>

      

      <View style={styles.subhead}>
        <Text
          fontWeight="regular"
          color="black"
          fontStyle="regular"
          fontSize="sm"
        >
          We are always seeking to expand our library of languages. {'\n'}
          We have a few questions for you and we will get back to you {'\n'} in
          1 - 2 weeks. If approved, your course will appear on your home page.
        </Text>
      </View>

      <View style={styles.scrollView}>
      <ScrollView  >

        <Text         
          fontWeight="regular"
          color="black"
          fontStyle="regular"
          fontSize="md">
            Your Name*
        </Text>
      <Input size="xl" 
      style={styles.input}
          onChangeText={text => setName(text)}
        />

       </ScrollView>
      </View>
 

    
    
      <View style={styles.submitForm}>
        <StyledButton title="Apply To Contribute" variant="primary" />

        <Text
          fontWeight="regular"
          color="gray.medium"
          fontStyle="regular"
          fontSize="sm"
        >
          By selecting this button, you have permission from the
          community/speakers to create language learning materials
        </Text>
      </View>

   
    </View>
    
  )
}

Apply.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Apply.defaultProps = {
  navigation: { navigate: () => null },
}

export default Apply
