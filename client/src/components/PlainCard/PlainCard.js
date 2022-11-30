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
    // alignItems: 'center',
    maxWidth: '100%',
  },
  middle: {
    paddingLeft: 15,
  },
  right: {
  },
  rightIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
})

const PlainCard = ({
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
}) => {
  const generateRightIcon = rightIcon ? (
    <Box style={styles.rightIcon}>{rightIcon}</Box>
  ) : null

  return (
    <Box
      py="3"
      width={width}
      height={height}
      style={styles.root}
      borderRadius="md"
      bg={isPressed ? colors.gray.medium_light : colors.white.dark}
    >
      <Box style={styles.middle}>
        <Text
          fontFamily="heading"
          fontWeight="regular"
          fontStyle="normal"
          fontSize="xl"
          numberOfLines={1}
        >
          {titleText}
        </Text>
      </Box>
      <Box style={styles.right}>
        {generateRightIcon}
      </Box>
    </Box>
  )
}

PlainCard.propTypes = {
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
}

PlainCard.defaultProps = {
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
}

export default PlainCard
