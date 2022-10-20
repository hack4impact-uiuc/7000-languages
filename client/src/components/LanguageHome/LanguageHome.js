import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { colors } from 'theme'
import PropTypes from 'prop-types'
import { ScrollView, Text } from 'native-base'
import StyledButton from 'components/StyledButton'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import StyledCard from 'components/StyledCard'
import NumberBox from 'components/NumberBox'
import { downloadAudioFile } from 'api'
import { useDispatch, useSelector } from 'react-redux'
import { Audio } from 'expo-av'
import { useErrorWrap, useTrackPromise } from 'hooks'
import { pushAudioURI } from 'slices/language.slice'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.red.dark,
  },
  top: {
    backgroundColor: colors.red.dark,
    minHeight: 100,
    overflow: 'hidden',
    display: 'flex',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  edit: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  manageBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

const LanguageHome = ({
  isLessonHome,
  languageName,
  languageDescription,
  lessonName,
  lessonDescription,
  nextUpdate,
  valueName,
  buttonText,
  rightIconName,
  buttonCallback,
  nextPageCallback,
  data,
}) => {
  const errorWrap = useErrorWrap()
  const trackPromise = useTrackPromise()
  const dispatch = useDispatch()

  const [renderData, setRenderData] = useState(data)

  useEffect(() => {
    setRenderData(data)
  }, [data])

  const {
    currentCourseId, currentUnitId, currentLessonId, lessonData,
  } = useSelector((state) => state.language)

  const getAudio = async (vocabId) => {
    await errorWrap(async () => {
      const vocabIndex = lessonData.vocab.findIndex(
        (element) => element._id === vocabId,
      )

      const vocabItem = lessonData.vocab[vocabIndex]

      let uri = null

      // Check if the audio has already been fetched
      if (vocabItem.audioURI) {
        uri = vocabItem.audioURI
      } else {
        const filePath = vocabItem.audio
        const splitPath = filePath.split('.')

        // Get the file type from the vocabItem's audio field
        let fileType = 'm4a'

        if (splitPath.length === 2) {
          // eslint-disable-next-line prefer-destructuring
          fileType = splitPath[1]
        }

        // Downloads audio file and gets Filesystem uri
        uri = await trackPromise(
          downloadAudioFile(
            currentCourseId,
            currentUnitId,
            currentLessonId,
            vocabId,
            fileType,
          ),
        )

        // Add to redux
        dispatch(pushAudioURI({ vocabId, uri }))
      }

      if (uri) {
        // Plays audio recording
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
        })
        const { sound } = await Audio.Sound.createAsync({ uri })
        await sound.playAsync()
      }
    })
  }

  // Generates the Lesson Home Page
  if (isLessonHome) {
    return (
      <>
        <View style={styles.top}>
          <View style={styles.edit}>
            <Text
              fontFamily="heading"
              fontWeight="regular"
              fontStyle="normal"
              color="white.dark"
              fontSize={35}
              paddingLeft={5}
              paddingTop={5}

            >
              {lessonName}
            </Text>
            <Ionicons
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginRight: 20,
                marginTop: 30,

              }}
              name="ios-pencil" size={24} color={colors.white.dark} onPress={nextUpdate}>
            </Ionicons>
          </View>
          <Text
            fontFamily="heading"
            fontWeight="regular"
            fontStyle="normal"
            color="white.dark:alpha.40"
            fontSize="xl"
            lineHeight={20}
            paddingBottom={5}
            paddingX={5}
            paddingTop={2}
            adjustsFontSizeToFit
          >
            {lessonDescription}
          </Text>
        </View>
        <View style={styles.manageBar}>
          <Text
            fontFamily="heading"
            fontWeight="regular"
            fontStyle="normal"
            fontSize={23}
            paddingTop={3}
            paddingLeft={5}
          >
            {renderData.length} Vocabulary Items
          </Text>
          <StyledButton
            title="Add New"
            variant="manage"
            fontSize={15}
            rightIcon={(
              <MaterialCommunityIcons
                name="plus-circle"
                color={colors.red.dark}
                size={20}
              />
            )}
            onPress={buttonCallback}
          />
        </View>

        <ScrollView>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {renderData.map((element) => (
              <StyledCard
                key={element._id}
                titleText={element.body}
                bodyText={element.name}
                imageURI={element.imageURI}
                showVolumeIcon={element.audio}
                volumeIconCallback={() => getAudio(element._id)}
                width={width * 0.97}
                height={element.imageURI === '' ? 75 : 100}
                rightIcon={(
                  <MaterialCommunityIcons
                    name="pencil"
                    color="black"
                    size={20}
                    onPress={() => nextPageCallback(element)}
                  />
                )}
              />
            ))}
          </View>
        </ScrollView>
      </>
    )
  }

  // Generates the Course or Unit Home Page
  return (
    <>
      <View style={styles.top}>
        <View style={styles.edit}>
          <Text
            fontFamily="heading"
            fontWeight="regular"
            fontStyle="normal"
            color="white.dark"
            fontSize={35}
            paddingLeft={5}
            paddingTop={5}
            paddingBottom={1}
          >
            {languageName}
          </Text>
          <Ionicons
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginRight: 20,
              marginTop: 30,

            }}
            name="ios-pencil" size={24} color={colors.white.dark} onPress={nextUpdate}>
          </Ionicons>
        </View>
        <Text
          fontFamily="heading"
          fontWeight="regular"
          fontStyle="normal"
          color="white.dark:alpha.40"
          fontSize="xl"
          lineHeight={20}
          paddingLeft={5}
          paddingRight={5}
          paddingBottom={5}
          adjustsFontSizeToFit
        >
          {languageDescription}
        </Text>

      </View>
      <View style={styles.manageBar}>
        <Text
          fontFamily="heading"
          fontWeight="regular"
          fontStyle="normal"
          fontSize={23}
          paddingTop={3}
          paddingLeft={5}
        >
          {renderData.length} {valueName}
        </Text>
        <StyledButton
          title={buttonText}
          variant="manage"
          fontSize={15}
          rightIcon={(
            <MaterialCommunityIcons
              name={rightIconName}
              color={colors.red.dark}
              size={20}
            />
          )}
          onPress={buttonCallback}
        />
      </View>

      <ScrollView>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {renderData.map((element, index) => (
            <StyledCard
              key={element._id}
              leftIcon={<NumberBox number={index + 1} />}
              titleText={element.name}
              bodyText={element.body}
              width={width * 0.97}
              height={75}
              indicatorType={element.indicatorType}
              rightIcon={(
                <MaterialCommunityIcons
                  name="pencil"
                  color="black"
                  size={20}
                  onPress={() => nextPageCallback(element)}
                />
              )}
            />
          ))}
        </View>
      </ScrollView>
    </>
  )
}

// Page Object Fields
LanguageHome.propTypes = {
  isLessonHome: PropTypes.bool,
  languageName: PropTypes.string,
  languageDescription: PropTypes.string,
  lessonDescription: PropTypes.string,
  nextUpdate: PropTypes.func,
  valueName: PropTypes.string,
  buttonText: PropTypes.string,
  rightIconName: PropTypes.string,
  buttonCallback: PropTypes.func,
  nextPageCallback: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
}

// Page Default Fields
LanguageHome.defaultProps = {
  isLessonHome: false,
  languageName: '',
  languageDescription: '',
  lessonDescription: '',
  nextUpdate: () => { },
  valueName: '',
  buttonText: '',
  rightIconName: '',
  buttonCallback: () => { },
  nextPageCallback: () => { },
  data: [],
}

export default LanguageHome
