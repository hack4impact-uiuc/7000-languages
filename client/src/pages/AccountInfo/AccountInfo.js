import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, View, Linking, Alert, Pressable
} from 'react-native'
import {
  Text, ScrollView, Image, Input, Checkbox, TextArea, Box
} from 'native-base'
import { useErrorWrap, useTrackPromise } from 'hooks'
import { createCourse } from 'api'
import { getAllUserCourses } from 'utils/languageHelper'
import { useDispatch } from 'react-redux'
import { setField } from 'slices/language.slice'
import RequiredField from 'components/RequiredField'
import DrawerLogoutButton from 'components/DrawerLogoutButton'
import StyledCard from '../../components/StyledCard'
import PlainCard from '../../components/PlainCard'
import i18n from 'utils/i18n'
import { colors, images } from 'theme'
import { MaterialCommunityIcons } from '@expo/vector-icons'


const styles = StyleSheet.create({
})

const drawerStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: '#F9F9F9',
  },
  topDivider: {
    marginTop: '10%',
    marginBottom: '5%',
    height: 1,
    backgroundColor: '#EFEFEF',
    width: '90%',
  },
  bottomDivider: {
    marginTop: 15,
    marginBottom: 15,
    height: 1,
    backgroundColor: '#EFEFEF',
    // width: '90%',
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 10,
  },
  userInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginRight: 20,
    justifyContent: 'flex-end',
  },
  userName: {
    paddingLeft: 10,
    fontSize: 20,
  },
  userEmail: {
    fontSize: 15,
    paddingLeft: 10,
  },
})

const AccountInfo = ({ props, navigation }) => {
  //   // application fields
  //   const [name, setName] = useState('')
  //   const [email, setEmail] = useState('')
  //   const [language, setLanguage] = useState('')
  //   const [description, setDescription] = useState('')
  //   const [otherNames, setOtherNames] = useState('')
  //   const [isoCode, setIsoCode] = useState('')
  //   const [glottoCode, setGlottoCode] = useState('')
  //   const [location, setLocation] = useState('')
  //   const [population, setPopulation] = useState('')
  //   const [acceptTerms, setAcceptTerms] = useState(false)
  //   const [teachingLanguage, setTeachingLanguage] = useState('')

  //   const [link, setLink] = useState(false)
  //   const errorWrap = useErrorWrap()
  //   const dispatch = useDispatch()

  //   // Confirms validation of course for pressing 'Submit'
  //   const areRequiredFieldsFilled = name !== ''
  //     && email !== ''
  //     && language !== ''
  //     && acceptTerms
  //     && teachingLanguage !== ''

  //   // Called when a user successfuly creates a new course
  //   const routeSuccess = () => {
  //     Alert.alert(
  //       `${i18n.t('dict.success')}`,
  //       `${i18n.t('dialogue.applicationSuccess')}`,
  //       [
  //         {
  //           text: `${i18n.t('dict.ok')}`,
  //           onPress: () => navigation.goBack(),
  //         },
  //       ],
  //     )
  //   }

  //   const applyCourse = async () => {
  //     const applicationData = {
  //       details: {
  //         admin_name: name,
  //         admin_email: email,
  //         name: language,
  //         alternative_name: otherNames,
  //         description,
  //         iso: isoCode,
  //         glotto: glottoCode,
  //         translated_language: teachingLanguage,
  //         population,
  //         location,
  //         link,
  //       },
  //     }

  //     let courseId = null

  //     await errorWrap(
  //       async () => {
  //         const { result } = await createCourse(applicationData)
  //         courseId = result._id
  //       },
  //       async () => {
  //         const { courses } = await getAllUserCourses()

  //         if (courses.length > 0) {
  //           // On success, update the drawer tab
  //           dispatch(setField({ key: 'allCourses', value: courses }))
  //           // Navigate to newly created course
  //           navigation.navigate(courseId)
  //         }

  //         // Go to the home page
  //         routeSuccess()
  //       },
  //     )
  //   }

  const [userEmail, setEmail] = useState('')
  const [userName, setName] = useState('')
  const [profileUrl, setProfileUrl] = useState('')
  const errorWrap = useErrorWrap()
  const trackPromise = useTrackPromise()

  const dispatch = useDispatch()

  useEffect(() => {
    const getUserData = async () => {
      await errorWrap(async () => {
        const {
          picture, name, email, courses,
        } = await trackPromise(
          getAllUserCourses(),
        )

        // Set personal info
        setProfileUrl(picture)
        setName(name)
        setEmail(email)

        if (courses.length > 0) {
          dispatch(setField({ key: 'allCourses', value: courses }))
        }
      })
    }
    getUserData()
  }, [])
  const [isDisabled, setDisabled] = useState(false) // used to disable success button
  // sets the initial state of isDisabled state to the isDisabled param

  useEffect(() => setDisabled(isDisabled), [isDisabled]) // always listening to when isDisabled is changed

  const goToNextPage = (element) => {
    const currentUnitId = element._id
    dispatch(setField({ key: 'currentUnitId', value: currentUnitId })) // make sure to save the selected unit in state
    navigation.navigate('UnitHome')
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
            <Pressable
              // onPress={() => nextPageCallback(element)}
              // key={element._id}
            >
              {({ isPressed }) => (
                <PlainCard
                  // key={element._id}
                  // leftIcon={<NumberBox number={index + 1} />}
                  titleText={'Language'}
                  // bodyText={'Choose the app language'}
                  width={'100%'}
                  height={75}
                  // indicatorType={element.indicatorType}
                  rightIcon={(
                    <MaterialCommunityIcons
                      name="chevron-right"
                      color="black"
                      size={40}
                    />
                  )}
                  isPressed={isPressed}
                />
              )}
            </Pressable>
            <Text>

              FUCK SHIT FUCK
            </Text>
            {/* <StyledButton
              title={successText}
              onPress={onPress}
              areAllFieldsFilled={isDisabled}
              variant="primary"
            /> */}
            <View style={drawerStyles.bottomDivider} />
            <View style={drawerStyles.bottomContainer}>
              <Image
                source={
                  profileUrl === ''
                    ? images.default_icon
                    : { uri: profileUrl }
                }
                alt="Profile Icon"
                size="sm"
                resizeMode="contain"
                borderRadius={100}
              />
              <View style={drawerStyles.userInfoContainer}>
                <Text
                  style={userName}
                  fontFamily="heading"
                  fontWeight="regular"
                  fontStyle="normal"
                >
                  {userName}
                </Text>
                <Text style={userEmail}>{userEmail}</Text>
              </View>
            </View>
            <View style={drawerStyles.bottomDivider} />
            <DrawerLogoutButton />

          </ScrollView>
        </View>
      </View>
    </>
  )
}

export default AccountInfo
