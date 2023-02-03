import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, View, Linking, Alert,
} from 'react-native'
import StyledButton from 'components/StyledButton'
import {
  Text, ScrollView, Input, Checkbox, TextArea, Box,
} from 'native-base'
import { useErrorWrap } from 'hooks'
import { createCourse } from 'api'
import { getAllUserCourses } from 'utils/languageHelper'
import { useDispatch } from 'react-redux'
import { setField } from 'slices/language.slice'
import RequiredField from 'components/RequiredField'
import i18n from 'utils/i18n'

const styles = StyleSheet.create({
  formBody: {
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
    height: '95%',
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
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  inputHeight: {
    height: 50,
  },
  submitButton: {
    paddingVertical: 10,
    width: '99%',
    alignItems: 'center',
  },
  disclaimerView: {
    marginTop: 10,
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
  const [teachingLanguage, setTeachingLanguage] = useState('')

  const [link, setLink] = useState(false)
  const errorWrap = useErrorWrap()
  const dispatch = useDispatch()

  // Confirms validation of course for pressing 'Submit'
  const areRequiredFieldsFilled = name !== ''
    && email !== ''
    && language !== ''
    && acceptTerms
    && teachingLanguage !== ''
    && description !== ''

  // Called when a user successfuly creates a new course
  const routeSuccess = () => {
    Alert.alert(
      `${i18n.t('dict.success')}`,
      `${i18n.t('dialogue.applicationSuccess')}`,
      [
        {
          text: `${i18n.t('dict.ok')}`,
          onPress: () => navigation.goBack(),
        },
      ],
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
        translated_language: teachingLanguage,
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
          navigation.navigate(`${courseId}-contributor`)
        }

        // Go to the home page
        routeSuccess()
      },
    )
  }
  const [isDisabled, setDisabled] = useState(false) // used to disable success button
  // sets the initial state of isDisabled state to the isDisabled param

  useEffect(() => setDisabled(isDisabled), [isDisabled]) // always listening to when isDisabled is changed

  const onSubmit = async () => {
    if (!isDisabled) {
      setDisabled(true)
      if (areRequiredFieldsFilled) {
        await applyCourse()
      }
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
                {i18n.t('dialogue.contributorThanks')}
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
                {i18n.t('dialogue.applicationFeedback')}
              </Text>
            </View>

            <View style={styles.formBody}>
              <RequiredField title={i18n.t('dict.yourName')} fontSize="md" />
              <Input
                size="2xl"
                style={styles.inputHeight}
                returnKeyType="done"
                onChangeText={(text) => setName(text)}
              />
              <RequiredField title={i18n.t('dict.email')} fontSize="md" />
              <Input
                size="xl"
                style={styles.inputHeight}
                returnKeyType="done"
                onChangeText={(text) => setEmail(text)}
              />
              <RequiredField
                title={i18n.t('dict.languageName')}
                fontSize="md"
              />
              <Input
                size="xl"
                style={styles.inputHeight}
                returnKeyType="done"
                onChangeText={(text) => setLanguage(text)}
              />
              <Text
                fontFamily="body"
                fontWeight="regular"
                color="black"
                fontStyle="normal"
                fontSize="md"
              >
                {i18n.t('dialogue.alternativeNamesPrompt')}
              </Text>

              <Input
                size="xl"
                style={styles.inputHeight}
                returnKeyType="done"
                onChangeText={(text) => setOtherNames(text)}
              />

              <RequiredField
                title={i18n.t('dict.languageDescription')}
                fontSize="md"
              />

              <Text
                fontFamily="body"
                fontWeight="regular"
                color="gray.medium"
                fontStyle="normal"
                fontSize="md"
              >
                {i18n.t('dialogue.languageDescriptionPrompt')}
              </Text>
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
              <RequiredField
                title={i18n.t('dict.teachingLanguage')}
                fontSize="md"
              />
              <Text
                fontFamily="body"
                fontWeight="regular"
                color="gray.medium"
                fontStyle="normal"
                fontSize="md"
              >
                {i18n.t('dialogue.teachingLanguagePrompt')}
              </Text>
              <Input
                size="xl"
                style={styles.inputHeight}
                returnKeyType="done"
                onChangeText={(text) => setTeachingLanguage(text)}
              />
              <Text
                fontFamily="body"
                fontWeight="regular"
                color="black"
                fontStyle="normal"
                fontSize="md"
              >
                {i18n.t('dict.ISOCode')}
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
                {i18n.t('dialogue.ISOCodePrompt')}
              </Text>
              <Input
                size="xl"
                style={styles.inputHeight}
                returnKeyType="done"
                onChangeText={(text) => setIsoCode(text)}
              />

              <Text
                fontFamily="body"
                fontWeight="regular"
                color="black"
                fontStyle="normal"
                fontSize="md"
              >
                {i18n.t('dict.glottoCode')}
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
                {i18n.t('dialogue.glottoCodePrompt')}
              </Text>
              <Input
                size="xl"
                style={styles.inputHeight}
                returnKeyType="done"
                onChangeText={(text) => setGlottoCode(text)}
              />
              <Text
                fontFamily="body"
                fontWeight="regular"
                color="black"
                fontStyle="normal"
                fontSize="md"
              >
                {i18n.t('dialogue.languageOriginPrompt')}
              </Text>
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
              <Text
                fontFamily="body"
                fontWeight="regular"
                color="black"
                fontStyle="normal"
                fontSize="md"
              >
                {i18n.t('dialogue.languagePopulationPrompt')}
              </Text>
              <Input
                size="xl"
                style={styles.inputHeight}
                returnKeyType="done"
                onChangeText={(text) => setPopulation(text)}
              />
              <Text
                fontFamily="body"
                fontWeight="regular"
                color="black"
                fontStyle="normal"
                fontSize="md"
              >
                {i18n.t('dialogue.languageLinkPrompt')}
              </Text>
              <Input
                size="xl"
                style={styles.inputHeight}
                returnKeyType="done"
                onChangeText={(text) => setLink(text)}
              />
              <View style={styles.checkboxes}>
                <Checkbox
                  value="accepted"
                  colorScheme="danger"
                  onChange={setAcceptTerms}
                >
                  <Text
                    fontFamily="body"
                    fontWeight="regular"
                    color="black"
                    fontStyle="normal"
                    fontSize="md"
                  >
                    {`${i18n.t('dialogue.agree')} `}
                    <Text
                      fontFamily="heading"
                      onPress={() => Linking.openURL('https://www.7000.org/about-3-1')}
                    >
                      {i18n.t('dict.termsAndConditions')}
                    </Text>
                  </Text>
                </Checkbox>
              </View>
            </View>
            <View style={styles.disclaimerView}>
              <Text
                fontFamily="body"
                fontWeight="regular"
                color="gray.medium"
                fontStyle="normal"
                fontSize="sm"
              >
                {i18n.t('dialogue.languageUsePermission')}
              </Text>
            </View>
            <Box style={styles.submitButton}>
              <StyledButton
                title={i18n.t('dict.submit')}
                variant="primary"
                onPress={onSubmit}
                isDisabled={!areRequiredFieldsFilled}
              />
            </Box>
          </ScrollView>
        </View>
      </View>
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
