import React from 'react'
import PropTypes from 'prop-types'
import { Text, Divider } from 'native-base'
import { StyleSheet, View, ScrollView } from 'react-native'
import StyledButton from 'components/StyledButton'
import { colors } from 'theme'
import StyledCard from 'components/StyledCard'
import { Feather, AntDesign } from '@expo/vector-icons'

const styles = StyleSheet.create({
    root: {
        backgroundColor: colors.white.dark,
    },
    selected: {
        marginTop: 10,
        width: '95%',
        height: 'auto',
    },
    unselected: {
        width: '95%',
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
                <Text fontFamily="heading" fontWeight="regular" fontSize="xl">
                    {selectedTitleText}
                </Text>
                <StyledButton
                    title={addText}
                    variant="small"
                    fontSize="md"
                    rightIcon={<AntDesign name="pluscircle" size={18} color={colors.red.dark} />
                    }
                />
            </View>
            <Text fontFamily="body" fontWeight="regular" fontSize="md" color="gray.medium">
                {selectedBodyText}
            </Text>
            <StyledCard
                titleText="Initial Phrases"
                bodyText="2 lessons"
                leftIcon={<Feather name="menu" size={25} color={colors.gray.medium} />}
                rightIcon={<AntDesign name="minuscircle" size={20} color={colors.red.dark} />}
                imageUri='https://wallpaperaccess.com/full/317501.jpg'
                showVolumeIcon
                volumeIconCallback={() => alert("clicked")}
            />
        </View>
        <Divider my={2} />
        <View style={styles.unselected}>
            <View style={styles.header}>
                <Text fontFamily="heading" fontWeight="regular" fontSize="xl">
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
