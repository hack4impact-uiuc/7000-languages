import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from 'native-base';
import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({
    root: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
})

const StyledCard = ({
}) => {
    return (
        <Box style={styles.root} width="90%" border="15" borderRadius="md" bg="red.dark">
            <Box px="4">
                NativeBase
            </Box>
            <Box px="4">
                Test 2
            </Box>
        </Box>
    )
}
// Button object fields
// StyledCard.propTypes = {

// }

// StyledCard.defaultProps = {

// }

export default StyledCard
