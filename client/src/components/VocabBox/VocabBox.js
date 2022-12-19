import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text, Image } from 'native-base'
import { StyleSheet, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { colors } from 'theme'
import StyledButton from 'components/StyledButton'
import i18n from 'utils/i18n'

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: '100%',
    backgroundColor: colors.gray.light,
    borderWidth: 2,
    borderColor: colors.gray.semi_light,
    borderRadius: 12,
    margin: 4,
    textAlign: 'left',
  },
  top: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexShrink: 2,
  },
  middle: {
    flexDirection: 'row',
    left: 0,
    padding: 5,
  },
  bottom: {
    display: 'flex',
    alignItems: 'center',
  },
  leftIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  soundIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray.semi_light,
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  indicator: {},
})

const VocabBox = ({
  titleText,
  bodyText,
  imageURI,
  showVolumeIcon,
  volumeIconCallback,
  width,
  height,
  notes,
}) => {
  const generateImage = imageURI === '' ? null : (
    <Box style={styles.indicator}>
      <Image
        source={{
          uri: imageURI,
        }}
        alt="Alternate Text"
        size="lg"
        resizeMode="cover"
        borderRadius={10}
      />
    </Box>
  )
  const generateAudio = showVolumeIcon ? (
    <StyledButton
      title={i18n.t('actions.playAudio')}
      variant="learner_secondary"
      fontSize="18"
      rightIcon={
        <FontAwesome name="volume-up" size={25} color={colors.blue.darker} />
      }
      onPress={volumeIconCallback}
    />
  ) : (
    <View style={{ height: 100 }} />
  )

  const generateNotes = notes === '' ? null : (
    <View style={{ width: '50%' }}>
      <Text
        fontWeight="regular"
        color="gray.medium"
        fontStyle="italic"
        fontSize="lg"
      >
        {notes}
      </Text>
    </View>
  )

  return (
    <Box
      py="3"
      width={width}
      height={height}
      style={styles.root}
      borderRadius="md"
    >
      <Box px="2" style={styles.top}>
        <Text
          fontFamily="heading"
          fontWeight="regular"
          fontStyle="normal"
          fontSize="xl"
          numberOfLines={1}
        >
          {titleText}
        </Text>
        <Text color="gray.medium" fontSize="xl" numberOfLines={1}>
          {bodyText}
        </Text>
      </Box>
      <Box
        style={{
          ...styles.middle,
          justifyContent:
            imageURI === '' || notes === '' ? 'flex-start' : 'space-evenly',
        }}
      >
        {generateNotes}
        {generateImage}
      </Box>
      <Box style={styles.bottom}>{generateAudio}</Box>
    </Box>
  )
}

VocabBox.propTypes = {
  titleText: PropTypes.string,
  bodyText: PropTypes.string,
  imageURI: PropTypes.string,
  showVolumeIcon: PropTypes.bool,
  volumeIconCallback: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  notes: PropTypes.string,
}

VocabBox.defaultProps = {
  titleText: '',
  bodyText: '',
  imageURI: '',
  showVolumeIcon: false,
  volumeIconCallback: () => {},
  width: 100,
  height: 300,
  notes: '',
}

export default VocabBox
