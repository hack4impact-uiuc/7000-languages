import React, { useState, useEffect } from 'react'
import { Text, Select, Divider, Image } from 'native-base'
import { Alert, StyleSheet, View, Dimensions } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import i18n from 'utils/i18n'
import { colors, images } from 'theme'
import PlainCard from '../../components/PlainCard'
import DrawerLogoutButton from 'components/DrawerLogoutButton'
import { useErrorWrap, useTrackPromise } from 'hooks'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserCourses } from 'utils/languageHelper'
import { setField } from 'slices/language.slice'

const { width } = Dimensions.get('window')

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
    bottom: 0,
    width: '90%',
  },
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descriptionText: {
    color: colors.gray.medium
  },
  personalInfoContainer: {
    position: 'absolute',
    bottom: 0
  }
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
    marginTop: '3%',
    height: 1,
    backgroundColor: '#EFEFEF',
    width: '90%',
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 10,
    // position: 'absolute',
    // bottom: 0
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

const SimpleSelect = () => {
  const [userEmail, setEmail] = useState('')
  const [userName, setName] = useState(`${i18n.t('dict.loading')}`)
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
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.description}>
        <View style={styles.header}>
          <Text fontFamily="heading" fontWeight="regular" fontSize="xl">
            {i18n.t('dict.accountInfo')}
          </Text>
        </View>
        <Text style={styles.descriptionText} fontSize="md"
        >
          Here are the settings page for you to manage your app.
        </Text>
      </View>
      <PlainCard
        titleText='Language'
        width={width * 0.97}
        height={60}
        rightIcon={(
          <MaterialCommunityIcons
            name="chevron-right"
            color="black"
            size={40}
          />
        )}
      />
      <View style={styles.personalInfoContainer}>
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
              style={drawerStyles.userName}
              fontFamily="heading"
              fontWeight="regular"
              fontStyle="normal"
            >
              {userName}
            </Text>
            <Text style={drawerStyles.userEmail}>{userEmail}</Text>
          </View>
        </View>
        <DrawerLogoutButton />
      </View>
      <View style={drawerStyles.bottomDivider} />
    </View >
  )
}

export default SimpleSelect
