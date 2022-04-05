import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Linking } from 'react-native'
import StyledButton from 'components/StyledButton'
import { colors, fonts } from 'theme'
import { Text, ScrollView, Input, Checkbox, FormControl } from 'native-base'


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
    //flex: 2,
    //bottom: 10,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subhead: {
    //flex: 4,
    //bottom: 80,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    left: 1,
  },
  submitForm: {
    flex: 3,
    bottom: 1,
    alignItems: 'center',
  },
  scrollView: {
    flex: 8,
    width: '90%',
    height: '100%',
    marginHorizontal: 100,
  },
  input: {
    backgroundColor: colors.gray.light,
    marginBottom: 10
  },
  checkboxes: {
    marginBottom: 25
  }, 

})

// things to do:
// fix styling for inputs + checkbox
// fix scroll view styling
// add submit
const Apply = ({ navigation }) => {
  // applicaton fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [language, setLanguage] = useState('')
  const [otherNames, setOtherNames] = useState('')
  const [isoCode, setIsoCode] = useState('')
  const [glottoCode, setGlottoCode] = useState('')
  const [location, setLocation] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [contact, setContact] = useState(false)

  const [errors, setErrors] = useState({})

  const validate = () => {
    const validateErrors = {}

    if (name === '') {

      validateErrors['name'] = 'Name is required'
       
    }  if (email === '') {
      validateErrors['email'] = 'Email is required'
      
    }  if (language === '') {
      validateErrors['Language'] = 'Language is required'

    } if (acceptTerms === false) {
      validateErrors['acceptTerms'] = 'Terms is required'

    } 
    setErrors(validateErrors) 
    
    if (Object.keys(validateErrors).length === 0 ) {
      return true
    } else {
      return false 
    }
  }


  


  

  // const submitApplication = async () => {
  //   const applicationData = {
  //     name: name,
  //     email: email,
  //     language: language,
  //     otherNames: otherNames,
  //     isoCode: isoCode,
  //     glottoCode: glottoCode,
  //     location: location,
  //     acceptTerms: acceptTerms,
  //     contact: contact
  //   };
  //   await errorWrap(
  //     async () => {
  //       const { idToken } = await Google.logInAsync({

  //       })

  //       if (idToken !== undefined) {
  //         const userData = {
  //           idToken,
  //         }

  //         // call API
  //         await postApplication(applicationData)
  //         // Save to Async Storage
  //         // Update Redux Stor
  //       }
  //     },
  //     () => {
  //       console.log('success')
  //     },
  //     () => {
  //       console.log('error')
  //     },
  //   )
  // }

  const onSubmit = () => {

    console.log(acceptTerms)
    validate() ? console.log('Submitted') : console.log('Validation Failed');

  };

  


  // should this be string?? Can check DB later

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
        <ScrollView>
          <FormControl is Required isInvalid={'name' in errors}>
            <Text
              style={{
                fontFamily: 'GT_Haptik_regular',
              }}
              fontWeight="regular"
              color="black"
              fontStyle="regular"
              fontSize="md"
            >
              Your Name*
            </Text>
            <View style={styles.input}>
              <Input
                size="2xl"
                style={{ height: '50px' }}
                onChangeText={(text) => setName(text)}
                style={{
                  
                }}
  
              />
              {'name' in errors ? (
                <FormControl.ErrorMessage>Required.</FormControl.ErrorMessage>
              ) : null}
            </View>
          </FormControl>
          <FormControl isRequired isInvalid={'email' in errors}>
            <Text
              style={{
                fontFamily: 'GT_Haptik_regular',
              }}
              fontWeight="regular"
              color="black"
              fontStyle="regular"
              fontSize="md"
            >
              Email*
            </Text>
            <View style={styles.input}>
              <Input
                size="xl"
                style={{ height: '50px' }}
                onChangeText={(text) => setEmail(text) }
              />
              {'email' in errors ? (
                <FormControl.ErrorMessage>Required.</FormControl.ErrorMessage>
              ) : null}
            </View>
          </FormControl>
          <FormControl isRequired isInvalid={'Language' in errors}>
            <Text
              style={{
                fontFamily: 'GT_Haptik_regular',
              }}
              fontWeight="regular"
              color="black"
              fontStyle="regular"
              fontSize="md"
            >
              Name of Language*
            </Text>
            <View style={styles.input}>
              <Input
                size="xl"
                style={{ height: '50px' }}
                onChangeText={(text) => setLanguage(text)}
              />
              {'Language' in errors ? (
                <FormControl.ErrorMessage>Required.</FormControl.ErrorMessage>
              ) : null}
            </View>
          </FormControl>

          <Text
            style={{
              fontFamily: 'GT_Haptik_regular',
            }}
            fontWeight="regular"
            color="black"
            fontStyle="regular"
            fontSize="md"
          >
            Any alternative names?
          </Text>
          <View style={styles.input}>
            <Input
              size="xl"
              style={{ height: '50px' }}
              onChangeText={(text) => setOtherNames(text)}
            />
          </View>

          <Text
            style={{
              fontFamily: 'GT_Haptik_regular',
            }}
            fontWeight="regular"
            color="black"
            fontStyle="regular"
            fontSize="md"
          >
            ISO Code
          </Text>

          {/* Make a URL link */}
          <Text
            style={{
              fontFamily: 'GT_Haptik_regular',
            }}
            fontWeight="regular"
            color="gray.medium"
            fontStyle="regular"
            fontSize="md"
          >
            You can find the ISO code here
          </Text>
          <View style={styles.input}>
            <Input
              size="xl"
              style={{ height: '50px' }}
              onChangeText={(text) => setIsoCode(text)}
            />
          </View>

          <Text
            style={{
              fontFamily: 'GT_Haptik_regular',
            }}
            fontWeight="regular"
            color="black"
            fontStyle="regular"
            fontSize="md"
            onPress={() => Linking.openURL('https://google.com')}
          >
            Glotto Code
          </Text>

          {/* Make a URL link */}
          <Text
            style={{
              fontFamily: 'GT_Haptik_regular',
            }}
            fontWeight="regular"
            color="gray.medium"
            fontStyle="regular"
            fontSize="md"
          >
            You can find the Glotto code here
          </Text>
          <View style={styles.input}>
            <Input
              size="xl"
              style={{ height: '50px' }}
              onChangeText={(text) => setGlottoCode(text)}
            />
          </View>

          <Text
            style={{
              fontFamily: 'GT_Haptik_regular',
            }}
            fontWeight="regular"
            color="black"
            fontStyle="regular"
            fontSize="md"
          >
            Where is this language spoken?
          </Text>
          <View style={styles.input}>
            <Input
              size="xl"
              style={{ height: '50px' }}
              onChangeText={(text) => setLocation(text)}
            />
          </View>

          <Text
            style={{
              fontFamily: 'GT_Haptik_regular',
            }}
            fontWeight="regular"
            color="black"
            fontStyle="regular"
            fontSize="md"
          >
            Approximately how many people speak this language?
          </Text>
          <View style={styles.input}>
            <Input
              size="xl"
              style={{ height: '50px' }}
              onChangeText={(text) => setName(text)}
            />
          </View>

          <Text
            style={{
              fontFamily: 'GT_Haptik_regular',
            }}
            fontWeight="regular"
            color="black"
            fontStyle="regular"
            fontSize="md"
          >
            link to additional information about the page.
          </Text>
          <View style={styles.input}>
            <Input
              size="xl"
              style={{ height: '50px' }}
              onChangeText={(text) => setName(text)}
            />
          </View>

          <View style={styles.checkboxes}>
          <FormControl is Required isInvalid={'acceptTerms' in errors}>
            <Checkbox value="accepted" colorScheme="danger"  onChange={setAcceptTerms}>
            {'acceptTerms' in errors ? (
                <FormControl.ErrorMessage>Required.</FormControl.ErrorMessage>
              ) : null}
              <Text
                style={{
                  fontFamily: 'GT_Haptik_regular',
                }}
                fontWeight="regular"
                color="black"
                fontStyle="regular"
                fontSize="md"
              >
                I agree to the {''}
              </Text>
              <Text
                style={{
                  fontFamily: 'GT_Haptik_bold',
                }}
                fontWeight="regular"
                color="black"
                fontStyle="regular"
                fontSize="md"
              >
                Terms and Conditions {'\n'}
              </Text>
            </Checkbox>
            </FormControl>
            <Checkbox value="two" colorScheme="danger">
              <Text
                style={{
                  fontFamily: 'GT_Haptik_regular',
                }}
                fontWeight="regular"
                color="black"
                fontStyle="regular"
                fontSize="md"
              >
               I would like a team member from 7000 languages 
                to follow up with you about creating additional 
                resources for my language.
              </Text>
            </Checkbox>
            </View>
        
          <View style={styles.submitForm}>
        <StyledButton title="Apply To Contribute" variant="primary"
        
                onPress={() => onSubmit()}
        />
        
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
        </ScrollView>
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
