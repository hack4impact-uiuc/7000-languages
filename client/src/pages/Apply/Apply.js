import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, View, Linking, Alert,
} from 'react-native'
import StyledButton from 'components/StyledButton'
import {
  Text,
  ScrollView,
  Input,
  Checkbox,
  FormControl,
  TextArea,
  Box,
} from 'native-base'
import { useErrorWrap } from 'hooks'
import { createCourse } from 'api'
import { getAllUserCourses } from 'utils/languageHelper'
import { useDispatch } from 'react-redux'
import { setField } from 'slices/language.slice'

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  },
  header: {
    marginTop: 15,
  },
  subhead: {
    marginBottom: 30,
    flexDirection: 'row',
    left: 1,
  },
  submitForm: {
    bottom: 6,
    alignItems: 'center',
  },
  scrollView: {
    width: '90%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '5%',
  },
  input: {
    marginBottom: 10,
  },
  checkboxes: {
    marginTop: 10,
    width: '98%',
  },
  inputHeight: {
    height: 50,
  },
  termsText: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
})

const Apply = ({ navigation }) => {
  // application fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [language, setLanguage] = useState('')
  const [description, setDescription] = useState('')
  const [otherNames, setOtherNames] = useState('')
  const [isoCode, setIsoCode] = useState('')
  const [glottoCode, setGlottoCode] = useState('')
  const [location, setLocation] = useState('')
  const [population, setPopulation] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [followUp, setFollowUp] = useState(false)
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
    if (followUp === false) {
      validateErrors.followUp = 'Follow up is required'
    }
    setErrors(validateErrors)

    return Object.keys(validateErrors).length === 0
  }

  // Confirms validation of course for pressing 'Submit'
  const areRequiredFieldsFilled = name !== '' && email !== '' && language !== '' && acceptTerms

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
        description,
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
          dispatch(setField({ key: 'allCourses', value: courses }))
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
    <>
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <View style={styles.scrollView}>
          <ScrollView>
            <View style={styles.header}>
              <Text
                fontFamily="heading"
                fontWeight="regular"
                color="black"
                fontStyle="normal"
                fontSize="sm"
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
                We hope this app will support your language revitalization
                efforts. We have a few questions for you and we will get back to
                you in 1 - 2 weeks. If approved, your course will appear on your
                home page.
              </Text>
            </View>

            <View style={styles.root}>
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
                </View>
              </FormControl>
              <FormControl>
                <Text
                  fontFamily="body"
                  fontWeight="regular"
                  color="black"
                  fontStyle="normal"
                  fontSize="md"
                >
                  Language Description
                </Text>
                <Text
                  fontFamily="body"
                  fontWeight="regular"
                  color="gray.medium"
                  fontStyle="normal"
                  fontSize="md"
                >
                  Provide a 1-2 sentence description of your language and/or
                  culture. This will be shown to learners in this course.
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
                    onChangeText={(text) => setDescription(text)}
                  />
                </View>
              </FormControl>

              <FormControl>
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
                  <Input
                    size="xl"
                    style={styles.inputHeight}
                    returnKeyType="done"
                    onChangeText={(text) => setOtherNames(text)}
                  />
                </View>
              </FormControl>
              <FormControl>
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
                  underline
                  fontFamily="body"
                  fontWeight="regular"
                  color="textBlue"
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
              </FormControl>
              <FormControl>
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
                  underline
                  fontFamily="body"
                  fontWeight="regular"
                  color="textBlue"
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
              </FormControl>
              <FormControl>
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
              </FormControl>
              <FormControl>
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
              </FormControl>
              <FormControl>
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
              </FormControl>

              <View style={styles.checkboxes}>
                <FormControl is Required isInvalid={'acceptTerms' in errors}>
                  <Checkbox
                    value="accepted"
                    colorScheme="danger"
                    onChange={setAcceptTerms}
                  >
                    <View>
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

              <View style={styles.checkboxes}>
                <FormControl is Required isInvalid={'followUp' in errors}>
                  <Checkbox
                    value="accepted"
                    colorScheme="danger"
                    onChange={setFollowUp}
                  >
                    <View>
                      <Text
                        fontFamily="body"
                        fontWeight="regular"
                        color="black"
                        fontStyle="normal"
                        fontSize="md"
                      >
                        I would like a team member from 7000 Languages to follow
                        up with me about creating additional resources for my
                        language.
                      </Text>
                    </View>
                  </Checkbox>
                </FormControl>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
      <Box style={styles.termsText}>
        <StyledButton
          title="Submit"
          variant="primary"
          onPress={onSubmit}
          isDisabled={!areRequiredFieldsFilled}
        />

        <Text
          fontFamily="body"
          fontWeight="regular"
          color="gray.medium"
          fontStyle="normal"
          fontSize="sm"
          textAlign="center"
        >
          By selecting this button, you have permission from the
          community/speakers to create language learning materials.
        </Text>
      </Box>
    </>
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
