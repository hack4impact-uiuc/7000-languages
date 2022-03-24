import React from 'react'
import PropTypes from 'prop-types'
import { Text, Divider } from 'native-base'
import { StyleSheet, View, ScrollView } from 'react-native'
import StyledButton from 'components/StyledButton'
import { colors } from 'theme'
import FontIcon from 'react-native-vector-icons/Feather'

const styles = StyleSheet.create({
    root: {
        backgroundColor: colors.white.dark,
    },
    selected: {
        width: '90%',
        height: 'auto',
    },
    unselected: {
        width: '90%',
        height: 'auto',
    },
    header: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'center'
    },
    body: {},
})

const ManageView = ({
    selectedTitleText, unselectedTitleText,
    selectedBodyText, unselectedBodyText,
    addText
}) => (
    <ScrollView contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center'
    }} style={styles.root}>
        <View style={styles.selected}>
            <View style={styles.header}>
                <Text fontFamily="heading" fontWeight="regular" fontSize="2xl">
                    {selectedTitleText}
                </Text>
                <StyledButton
                    title={addText}
                    variant="small"
                />
            </View>
            <Text fontFamily="body" fontWeight="regular" fontSize="md" color="gray.medium">
                {selectedBodyText}
            </Text>
        </View>
        <Divider my={2} />
        <View style={styles.unselected}>
            <View style={styles.header}>
                <Text fontFamily="heading" fontWeight="regular" fontSize="2xl">
                    {unselectedTitleText}
                </Text>
            </View>
            <Text fontFamily="body" fontWeight="regular" fontSize="md" color="gray.medium">
                {unselectedBodyText}
            </Text>
        </View>
    </ScrollView>
)

// Button object fields
ManageView.propTypes = {
    selectedTitleText: PropTypes.string,
    unselectedTitleText: PropTypes.string,
    selectedBodyText: PropTypes.string,
    unselectedBodyText: PropTypes.string,
    addText: PropTypes.string
}

ManageView.defaultProps = {
    selectedTitleText: '',
    unselectedTitleText: '',
    selectedBodyText: '',
    unselectedBodyText: '',
    addText: ''
}

export default ManageView
