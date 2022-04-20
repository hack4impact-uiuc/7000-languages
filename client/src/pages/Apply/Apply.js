import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, View, Linking, Alert,
} from 'react-native'
import StyledButton from 'components/StyledButton'
import { colors } from 'theme'
import {
  Text,
  ScrollView,
  Input,
  Checkbox,
  FormControl,
  TextArea,
} from 'native-base'
import useErrorWrap from 'hooks/useErrorWrap'
import createCourse from 'api'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white.light,
    color: 'black',
  },
  header: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subhead: {
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
    marginBottom: 10,
  },
  checkboxes: {
    marginBottom: 2,
    marginLeft: 7,
  },
  inputHeight: {
    height: '50px',
  },
  termsText: {
    bottom: 4,
    left: 16,
  },
  checkboxText2: {
    left: 10,
  },
})

const Apply = ({ navigation }) => {
  // applicaton fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [language, setLanguage] = useState('')
  const [otherNames, setOtherNames] = useState('')
  const [isoCode, setIsoCode] = useState('')
  const [glottoCode, setGlottoCode] = useState('')
  const [location, setLocation] = useState('')
  const [population, setPopulation] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [link, setLink] = useState(false)
  const errorWrap = useErrorWrap()
  const [errors, setErrors] = useState({})

  const validate = () => {
    const validateErrors = {}

    if (name === '') {
      validateErrors.name = 'Name is required'
    }
    if (email === '') {
      validateErrors.email = 'Email is required'
    }
    if (language === '') {
      validateErrors.Language = 'Language is required'
    }
    if (acceptTerms === false) {
      validateErrors.acceptTerms = 'Terms is required'
    }
    setErrors(validateErrors)

    if (Object.keys(validateErrors).length === 0) {
      return true
    }
    return false
  }

  const applyCourse = async () => {
    const applicationData = {
      details: {
        admin_name: name,
        admin_email: email,
        name: language,
        alternative_name: otherNames,
        description: '',
        iso: isoCode,
        glotto: glottoCode,
        population,
        location,
        link,
      },
    }

    async () => {
      // call API
      await createCourse(applicationData)
      // Save to Async Storage

      // Update Redux Store
    }
  }

  const onSubmit = () => {
    console.log(acceptTerms)
    if (validate() === true) {
      applyCourse()
      routeSuccess()
    } else {
      console.log('Validation Failed')
    }
  }

  const routeSuccess = () => {
    Alert.alert(
      'Success!',
      'You have succesfully submitted your application!',
      [{ text: 'OK', onPress: () => navigation.goBack() }],
    )
  }

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
                style={styles.inputHeight}
                returnKeyType="done"
                onChangeText={(text) => setName(text)}
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
                style={styles.inputHeight}
                returnKeyType="done"
                onChangeText={(text) => setEmail(text)}
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
                style={styles.inputHeight}
                returnKeyType="done"
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
            <TextArea
              size="2xl"
              h={40}
              variant="filled"
              placeholder=""
              keyboardType="default"
              returnKeyType="done"
              blurOnSubmit
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
            onPress={() => Linking.openURL('https://www.iso.org/obp/ui/#search')}
          >
            You can find the ISO code here
          </Text>
          <View style={styles.input}>
            <Input
              size="xl"
              style={styles.inputHeight}
              returnKeyType="done"
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
            onPress={() => Linking.openURL('https://glottolog.org/glottolog')}
          >
            You can find the Glotto code here
          </Text>
          <View style={styles.input}>
            <Input
              size="xl"
              style={styles.inputHeight}
              returnKeyType="done"
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
            <TextArea
              size="2xl"
              h={40}
              variant="filled"
              placeholder=""
              keyboardType="default"
              returnKeyType="done"
              blurOnSubmit
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
              style={styles.inputHeight}
              returnKeyType="done"
              onChangeText={(text) => setPopulation(text)}
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
              style={styles.inputHeight}
              returnKeyType="done"
              onChangeText={(text) => setLink(text)}
            />
          </View>

          <View style={styles.checkboxes}>
            <FormControl is Required isInvalid={'acceptTerms' in errors}>
              <Checkbox
                value="accepted"
                colorScheme="danger"
                onChange={setAcceptTerms}
              >
                {'acceptTerms' in errors ? (
                  <FormControl.ErrorMessage>Required.</FormControl.ErrorMessage>
                ) : null}
                <View style={styles.termsText}>
                  <Text
                    style={{
                      fontFamily: 'GT_Haptik_regular',
                    }}
                    fontWeight="regular"
                    color="black"
                    fontStyle="regular"
                    fontSize="md"
                  >
                    I agree to the
                  </Text>

                  <Text
                    style={{
                      fontFamily: 'GT_Haptik_bold',
                    }}
                    fontWeight="regular"
                    color="black"
                    fontStyle="regular"
                    fontSize="md"
                    onPress={() => Linking.openURL('https://www.7000.org/about-3-1')}
                  >
                    Terms and Conditions {'\n'}
                  </Text>
                </View>
              </Checkbox>
            </FormControl>
          </View>
          <View style={styles.checkboxes}>
            <Checkbox value="two" colorScheme="danger">
              <View style={styles.checkboxText2}>
                <Text
                  style={{
                    fontFamily: 'GT_Haptik_regular',
                  }}
                  fontWeight="regular"
                  color="black"
                  fontStyle="regular"
                  fontSize="md"
                >
                  I would like a team member from 7000 languages to follow up
                  with you about {'\n'}creating additional resources{'\n'}for my
                  language.
                </Text>
              </View>
            </Checkbox>
          </View>

          <View style={styles.submitForm}>
            <StyledButton
              title="Apply To Contribute"
              variant="primary"
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
