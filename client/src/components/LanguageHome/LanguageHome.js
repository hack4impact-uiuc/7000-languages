import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { colors } from 'theme'
import PropTypes from 'prop-types'
import { ScrollView, Text, Pressable } from 'native-base'
import StyledButton from 'components/StyledButton'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import StyledCard from 'components/StyledCard'
import NumberBox from 'components/NumberBox'
import { Audio } from 'expo-av'
import { useErrorWrap } from 'hooks'
import i18n from 'utils/i18n'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.red.medium_dark,
  },
  top: {
    backgroundColor: colors.red.medium_dark,
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
  languageDescription,
  languageName,
  lessonDescription,
  nextUpdate,
  singularItemText,
  pluralItemText,
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

  const extraSpaceView = <View style={{ height: 100 }} />

  const itemTitle = renderData.length === 1 ? singularItemText : pluralItemText

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
              fontSize={28}
              isTruncated
              paddingLeft={5}
              paddingTop={5}
            >
              {languageName}
            </Text>
            <MaterialCommunityIcons
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginRight: 20,
                marginTop: 30,
              }}
              name="pencil"
              size={30}
              color={colors.white.dark}
              onPress={nextUpdate}
            />
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
            {`${renderData.length} ${itemTitle}`}
          </Text>
          <StyledButton
            title={manageButtonText}
            variant="manage"
            fontSize={15}
            rightIcon={(
              <MaterialCommunityIcons
                name={manageIconName}
                color={colors.red.medium_dark}
                size={20}
              />
            )}
            onPress={buttonCallback}
          />
        </View>

        <ScrollView>
          {renderData.map((element) => (
            <StyledCard
              key={element._id}
              titleText={element.body}
              bodyText={element.name}
              imageURI={element.imageURI}
              showVolumeIcon={element.hasAudio}
              volumeIconCallback={() => playAudio(element.audioURI)}
              width={width * 0.97}
              height={element.imageURI === '' ? 75 : 100}
              rightIcon={(
                <MaterialCommunityIcons
                  name="pencil"
                  color="black"
                  size={30}
                  onPress={() => nextPageCallback(element)}
                />
              )}
            />
          ))}
          {extraSpaceView}
        </ScrollView>

        <View style={{ position: 'absolute', bottom: '5%', right: '5%' }}>
          <StyledButton
            title={addButtonText}
            variant="small"
            fontSize="20"
            leftIcon={(
              <AntDesign
                name="pluscircle"
                size={20}
                color={colors.red.medium_dark}
              />
            )}
            shadow
            onPress={addCallback}
          />
        </View>
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
            fontSize={28}
            isTruncated
            maxW="85%"
            paddingLeft={5}
            paddingTop={5}
            paddingBottom={1}
          >
            {languageName}
          </Text>
          <MaterialCommunityIcons
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              marginRight: 20,
              marginTop: 30,
            }}
            name="pencil"
            size={30}
            color={colors.white.dark}
            onPress={nextUpdate}
          />
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
          {`${renderData.length} ${itemTitle}`}
        </Text>
        <StyledButton
          title={manageButtonText}
          variant="manage"
          fontSize={15}
          rightIcon={(
            <MaterialCommunityIcons
              name={manageIconName}
              color={colors.red.medium_dark}
              size={20}
            />
          )}
          onPress={buttonCallback}
        />
      </View>

      <ScrollView>
        {renderData.map((element, index) => (
          <Pressable
            onPress={() => nextPageCallback(element)}
            key={element._id}
          >
            {({ isPressed }) => (
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
                    name="chevron-right"
                    color="black"
                    size={40}
                  />
                )}
                isPressed={isPressed}
              />
            )}
          </Pressable>
        ))}
        {extraSpaceView}
      </ScrollView>

      <View style={{ position: 'absolute', bottom: '5%', right: '5%' }}>
        <StyledButton
          title={addButtonText}
          variant="small"
          fontSize="20"
          leftIcon={(
            <AntDesign
              name="pluscircle"
              size={20}
              color={colors.red.medium_dark}
            />
          )}
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
  nextUpdate: PropTypes.func,
  singularItemText: PropTypes.string,
  pluralItemText: PropTypes.string,
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
  nextUpdate: () => {},
  lessonDescription: `${i18n.t('dialogue.setDescriptionPrompt')}`,
  singularItemText: '',
  pluralItemText: '',
  manageButtonText: '',
  addButtonText: '',
  manageIconName: '',
  buttonCallback: () => {},
  nextPageCallback: () => {},
  addCallback: () => {},
  data: [],
}

export default LanguageHome
