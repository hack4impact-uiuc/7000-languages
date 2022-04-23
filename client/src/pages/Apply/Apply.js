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
import { createCourse } from 'api'
import { getAllUserCourses } from 'utils/languageHelper'
import { useDispatch } from 'react-redux'
import { updateAllCourses } from 'slices/language.slice'

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
    width: '100%',
    marginBottom: 2,
    marginLeft: 7,
  },
  inputHeight: {
    height: '50px',
  },
  termsText: {
    width: '100%',
    bottom: 4,
    left: 16,
  },
})

const Apply = ({ navigation }) => {
  // application fields
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
  const dispatch = useDispatch()

  // Validates the course application form
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
      validateErrors.acceptTerms = 'Terms are required'
    }
    setErrors(validateErrors)

    return Object.keys(validateErrors).length === 0
  }

  // Called when a user successfuly creates a new course
  const routeSuccess = () => {
    Alert.alert(
      'Success!',
      'You have succesfully submitted your application!',
      [{ text: 'OK', onPress: () => navigation.goBack() }],
    )
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

    let courseId = null

    await errorWrap(
      async () => {
        const { result } = await createCourse(applicationData)
        courseId = result._id
      },
      async () => {
        const { courses } = await getAllUserCourses()

        if (courses.length > 0) {
          // On success, update the drawer tab
          dispatch(updateAllCourses({ allCourses: courses }))
          // Navigate to newly created course
          navigation.navigate(courseId)
        }

        // Go to the home page
        routeSuccess()
      },
    )
  }

  const onSubmit = async () => {
    if (validate() === true) {
      await applyCourse()
    }
  }

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text
          fontFamily="body"
          fontWeight="regular"
          color="black"
          fontStyle="normal"
          fontSize="md"
        >
          Thanks for your interest in contributing a language.
        </Text>
      </View>

      <View style={styles.subhead}>
        <Text
          fontFamily="body"
          fontWeight="regular"
          color="black"
          fontStyle="normal"
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
              fontFamily="body"
              fontWeight="regular"
              color="black"
              fontStyle="normal"
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
              fontFamily="body"
              fontWeight="regular"
              color="black"
              fontStyle="normal"
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
              fontFamily="body"
              fontWeight="regular"
              color="black"
              fontStyle="normal"
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
            fontFamily="body"
            fontWeight="regular"
            color="black"
            fontStyle="normal"
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
            fontFamily="body"
            fontWeight="regular"
            color="black"
            fontStyle="normal"
            fontSize="md"
          >
            ISO Code
          </Text>
          <Text
            fontFamily="body"
            fontWeight="regular"
            color="gray.medium"
            fontStyle="normal"
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
            fontFamily="body"
            fontWeight="regular"
            color="black"
            fontStyle="normal"
            fontSize="md"
          >
            Glotto Code
          </Text>
          <Text
            fontFamily="body"
            fontWeight="regular"
            color="gray.medium"
            fontStyle="normal"
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
            fontFamily="body"
            fontWeight="regular"
            color="black"
            fontStyle="normal"
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
            fontFamily="body"
            fontWeight="regular"
            color="black"
            fontStyle="normal"
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
            fontFamily="body"
            fontWeight="regular"
            color="black"
            fontStyle="normal"
            fontSize="md"
          >
            Link to additional information about this language.
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
                    fontFamily="body"
                    fontWeight="regular"
                    color="black"
                    fontStyle="normal"
                    fontSize="md"
                  >
                    I agree to the{' '}
                    <Text
                      fontFamily="heading"
                      onPress={() => Linking.openURL('https://www.7000.org/about-3-1')}
                    >
                      Terms and Conditions
                    </Text>
                  </Text>
                </View>
              </Checkbox>
            </FormControl>
          </View>
          <View style={styles.submitForm}>
            <StyledButton
              title="Apply To Contribute"
              variant="primary"
              onPress={onSubmit}
            />

            <Text
              fontFamily="body"
              fontWeight="regular"
              color="black"
              fontStyle="normal"
              fontSize="md"
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
    goBack: PropTypes.func,
  }),
}

Apply.defaultProps = {
  navigation: { navigate: () => null, goBack: () => null },
}

export default Apply
