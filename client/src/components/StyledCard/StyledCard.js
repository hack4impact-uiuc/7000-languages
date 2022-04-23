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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  rightIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 30,
  },
  soundIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  indicator: {
    marginRight: 15,
  },
})

const StyledCard = ({
  titleText,
  bodyText,
  leftIcon,
  rightIcon,
  imageUri,
  indicatorType,
  showVolumeIcon,
  volumeIconCallback,
  width,
  height,
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

  const generateRightImage = imageUri === '' ? (
    indicator
  ) : (
    <Box style={styles.indicator}>
      <Image
        source={{
          uri: imageUri,
        }}
        alt="Alternate Text"
        size="md"
        resizeMode="contain"
        borderRadius={5}
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
      style={styles.root}
      borderRadius="md"
      bg="white.dark"
    >
      <Box px="2" style={styles.left}>
        {generateLeftIcon}
        <Box>
          <Text fontFamily="heading" fontWeight="normal" fontSize="md">
            {titleText}
          </Text>
          <Text color="gray.medium" fontSize="md">
            {bodyText}
          </Text>
        </Box>
        {generateVolumeIcon}
      </Box>
      <Box>
        <Box style={styles.right}>
          {generateRightImage}
          {generateRightIcon}
        </Box>
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
  imageUri: PropTypes.string,
  showVolumeIcon: PropTypes.bool,
  volumeIconCallback: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
}

StyledCard.defaultProps = {
  titleText: '',
  bodyText: '',
  leftIcon: null,
  rightIcon: null,
  indicatorType: INDICATOR_TYPES.NONE,
  imageUri: '',
  showVolumeIcon: false,
  volumeIconCallback: () => { },
  width: 100,
  height: 70,
}

export default StyledCard
