import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { colors } from 'theme'
import PropTypes from 'prop-types'
import { ScrollView, Text } from 'native-base'
import StyledButton from 'components/StyledButton'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import StyledCard from 'components/StyledCard'
import NumberBox from 'components/NumberBox'
import { Audio } from 'expo-av'
import { useErrorWrap } from 'hooks'
<<<<<<< HEAD
=======
import i18n from 'utils/i18n'
>>>>>>> dev

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
  lessonDescription,
  valueName,
  manageButtonText,
  addButtonText,
  manageIconName,
  buttonCallback,
  nextPageCallback,
  addCallback,
  data,
}) => {
  const errorWrap = useErrorWrap()

  const [renderData, setRenderData] = useState(data)

  useEffect(() => {
    setRenderData(data)
  }, [data])

  const playAudio = async (uri) => {
    await errorWrap(async () => {
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
          <Text
            fontFamily="heading"
            fontWeight="regular"
            fontStyle="normal"
            color="white.dark:alpha.40"
            fontSize="xl"
            lineHeight={20}
            padding={5}
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
            {renderData.length} {i18n.t('dict.vocabItems')}
          </Text>
          <StyledButton
            title={i18n.t('actions.addNew')}
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
                volumeIconCallback={() => playAudio(element.audioURI)}
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
          title={manageButtonText}
          variant="manage"
          fontSize={15}
          rightIcon={(
            <MaterialCommunityIcons
              name={manageIconName}
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

      <View style={{ position: 'absolute', bottom: '5%', right: '5%' }}>
        <StyledButton
          title={addButtonText}
          variant="small"
          fontSize="20"
          leftIcon={
            <AntDesign name="pluscircle" size={20} color={colors.red.dark} />
          }
          shadow
          onPress={addCallback}
        />
      </View>
    </>
  )
}

// Page Object Fields
LanguageHome.propTypes = {
  isLessonHome: PropTypes.bool,
  languageName: PropTypes.string,
  languageDescription: PropTypes.string,
  lessonDescription: PropTypes.string,
  valueName: PropTypes.string,
  manageButtonText: PropTypes.string,
  addButtonText: PropTypes.string,
  manageIconName: PropTypes.string,
  buttonCallback: PropTypes.func,
  nextPageCallback: PropTypes.func,
  addCallback: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
}

// Page Default Fields
LanguageHome.defaultProps = {
  isLessonHome: false,
  languageName: '',
  languageDescription: '',
  lessonDescription: `${i18n.t('dialogue.setDescriptionPrompt')}`,
  valueName: '',
  manageButtonText: '',
  addButtonText: '',
  manageIconName: '',
  buttonCallback: () => {},
  nextPageCallback: () => {},
  addCallback: () => {},
  data: [],
}

export default LanguageHome
