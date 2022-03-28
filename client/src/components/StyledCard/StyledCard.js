import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text, Image } from 'native-base';
import { StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { colors } from 'theme'
import Indicator from 'components/Indicator';

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    left: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    right: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
    },
    soundIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    indicator: {
        marginRight: 15
    }
})

const StyledCard = ({
    titleText, bodyText, leftIcon, rightIcon, imageUri, showCompleteIndicator, showVolumeIcon, volumeIconCallback, width, height
}) => {
    const generateLeftIcon = leftIcon ? <Box style={styles.icon}>{leftIcon}</Box> : null;
    const generateRightIcon = leftIcon ? <Box style={styles.icon}>{rightIcon}</Box> : null;
    const generateRightImage = imageUri === ""
        ?
        <Box style={styles.indicator}>
            <Indicator isComplete={showCompleteIndicator} />
        </Box>
        :
        <Box style={styles.indicator}>
            <Image source={{
                uri: imageUri
            }} alt="Alternate Text" size="md" resizeMode="contain" borderRadius={5} />
        </Box>
    const generateVolumeIcon = showVolumeIcon ? <Box style={styles.soundIcon}>
        <FontAwesome name="volume-up" size={25} color={colors.black} onPress={volumeIconCallback} />
    </Box> : null

    return (
        <Box py="3" width={width} height={height} style={styles.root} borderRadius="md" bg="white.dark">
            <Box px="2" style={styles.left}>
                {generateLeftIcon}
                <Box>
                    <Text fontFamily="heading" fontWeight="regular" fontSize="md">{titleText}</Text>
                    <Text color="gray.medium" fontSize="md">{bodyText}</Text>
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
    showCompleteIndicator: PropTypes.bool,
    imageUri: PropTypes.string,
    showVolumeIcon: PropTypes.bool,
    volumeIconCallback: PropTypes.func
}

StyledCard.defaultProps = {
    titleText: "",
    bodyText: "",
    leftIcon: null,
    rightIcon: null,
    showCompleteIndicator: false,
    imageUri: "",
    showVolumeIcon: false,
    volumeIconCallback: () => { }
}

export default StyledCard
