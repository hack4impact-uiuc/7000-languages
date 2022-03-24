import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'native-base'
import { StyleSheet, View, ScrollView } from 'react-native'
import StyledButton from 'components/StyledButton'
import { colors } from 'theme'
import FontIcon from 'react-native-vector-icons/Feather'

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white.dark,
    },
    selected: {
        width: '90%',
        height: '80%',
    },
    header: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    body: {},
})

const ManageView = ({

}) => (
    <ScrollView>
        <View style={styles.selected}>
            <View style={styles.header}>
                <Text fontFamily="heading" fontWeight="regular" fontSize="2xl">
                    Test
                </Text>
                <FontIcon name="x" size={30} solid />
            </View>
        </View>
        {/* <View style={styles.selected}>

        </View> */}
    </ScrollView>
)
// Button object fields
// ManageView.propTypes = {

// }

// ManageView.defaultProps = {

// }

export default ManageView
