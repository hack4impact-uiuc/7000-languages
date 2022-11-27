import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text, Image } from 'native-base'
import { StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { colors } from 'theme'
import Indicator from 'components/Indicator'
import { INDICATOR_TYPES } from 'utils/constants'

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '100%',
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 2,
  },
  middle: {
    paddingLeft: 15,
    flexShrink: 2,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    left: 0,
  },
  right: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
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

const StyledCard = ({
  titleText,
  bodyText,
  leftIcon,
  rightIcon,
  imageURI,
  indicatorType,
  showVolumeIcon,
  volumeIconCallback,
  width,
  height,
  isPressed,
  containerStyle = {},
  backgroundColor = colors.white.dark,
  bodyTextColor = 'gray.medium',
}) => {
  const generateLeftIcon = leftIcon ? (
    <Box style={styles.leftIcon}>{leftIcon}</Box>
  ) : null
  const generateRightIcon = rightIcon ? (
    <Box style={styles.rightIcon}>{rightIcon}</Box>
  ) : null

  const indicator = indicatorType !== INDICATOR_TYPES.NONE ? (
    <Box style={styles.indicator}>
      <Indicator indicatorType={indicatorType} />
    </Box>
  ) : null
  const generateImage = imageURI === '' ? (
    false
  ) : (
    <Box style={styles.indicator}>
      <Image
        source={{
          uri: imageURI,
        }}
        alt="Alternate Text"
        size="md"
        resizeMode="cover"
        borderRadius={10}
      />
    </Box>
  )

  const generateVolumeIcon = showVolumeIcon ? (
    <Box style={styles.soundIcon}>
      <FontAwesome
        name="volume-up"
        size={25}
        color={colors.black}
        onPress={volumeIconCallback}
      />
    </Box>
  ) : null

  return (
    <Box
      py="3"
      width={width}
      height={height}
      style={{
        ...styles.root,
        ...containerStyle,
      }}
      borderRadius="md"
      bg={isPressed ? colors.gray.medium_light : backgroundColor}
    >
      <Box px="2" style={styles.left}>
        {generateImage}
        {generateLeftIcon}
        <Box style={styles.middle}>
          <Text
            fontFamily="heading"
            fontWeight="regular"
            fontStyle="normal"
            fontSize="lg"
            numberOfLines={1}
          >
            {titleText}
          </Text>
          <Text color={bodyTextColor} fontSize="lg" numberOfLines={1}>
            {bodyText}
          </Text>
          {indicator}
        </Box>
      </Box>
      <Box style={styles.right}>
        {generateRightIcon}
        {generateVolumeIcon}
      </Box>
    </Box>
  )
}

StyledCard.propTypes = {
  titleText: PropTypes.string,
  bodyText: PropTypes.string,
  leftIcon: PropTypes.element,
  rightIcon: PropTypes.element,
  indicatorType: PropTypes.number,
  imageURI: PropTypes.string,
  showVolumeIcon: PropTypes.bool,
  volumeIconCallback: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
  isPressed: PropTypes.bool,
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  backgroundColor: PropTypes.string,
  bodyTextColor: PropTypes.string,
}

StyledCard.defaultProps = {
  titleText: '',
  bodyText: '',
  leftIcon: null,
  rightIcon: null,
  indicatorType: INDICATOR_TYPES.NONE,
  imageURI: '',
  showVolumeIcon: false,
  volumeIconCallback: () => { },
  width: 100,
  height: 70,
  isPressed: false,
  containerStyle: {},
  backgroundColor: colors.white.dark,
  bodyTextColor: 'gray.medium',
}

export default StyledCard
