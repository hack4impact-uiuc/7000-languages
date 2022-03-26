import React from 'react'
import PropTypes from 'prop-types'
import { Text, Divider } from 'native-base'
import { StyleSheet, View, ScrollView } from 'react-native'
import StyledButton from 'components/StyledButton'
import { colors } from 'theme'
import StyledCard from 'components/StyledCard'
import { Feather, AntDesign } from '@expo/vector-icons'
import { AutoDragSortableView } from 'react-native-drag-sort'
import { Dimensions, Image, SafeAreaView } from 'react-native'

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

/* 

1. Add save button
2. State management + props with selected and unselected 
3. Remove unncesasry code (Profile) and comments (current plan b old)
4. final props + revert navigation to what it was prior

*/


/*

Current: https://github.com/mochixuan/react-native-drag-sort

Plan B:

https://github.com/computerjazz/react-native-draggable-flatlist
https://www.npmjs.com/package/react-native-draggable

Old:
https://github.com/gitim/react-native-sortable-list - old
https://baseweb.design/components/dnd-list

*/

const { width } = Dimensions.get('window')

const parentWidth = width
const childrenWidth = width - 20
const childrenHeight = 70

const sampleSelected = [
    { title: "Initial Phrases", body: "2 Lessons", isComplete: true },
    { title: "Identity", body: "5 Lessons", isComplete: false },
    { title: "Initial Phrases", body: "2 Lessons", isComplete: true },
    { title: "Identity", body: "5 Lessons", isComplete: false },
    { title: "Initial Phrases", body: "2 Lessons", isComplete: true },
    { title: "Identity", body: "5 Lessons", isComplete: false },
]

const sampleUnselected = [
    { title: "Initial Phrases", body: "2 Lessons", isComplete: true },
    { title: "Identity", body: "5 Lessons", isComplete: false },
    { title: "Initial Phrases", body: "2 Lessons", isComplete: true },
    { title: "Identity", body: "5 Lessons", isComplete: false },
]

const ManageView = ({
    selectedTitleText, unselectedTitleText,
    selectedBodyText, unselectedBodyText,
    addText
}) => {

    const renderSelectedItems = (item, index) => {
        return (
            <StyledCard
                titleText={item.title}
                bodyText={item.body}
                leftIcon={<AntDesign name="minuscircle" size={20} color={colors.red.dark} />}
                rightIcon={<Feather name="menu" size={25} color={colors.gray.medium} />}
                volumeIconCallback={() => alert("clicked")}
                showCompleteIndicator={item.isComplete}
                width={childrenWidth}
                height={childrenHeight}
            />
        )
    }

    const renderUnselectedItems = (item, index) => {
        return (
            <StyledCard
                titleText={item.title}
                bodyText={item.body}
                leftIcon={<AntDesign name="pluscircle" size={20} color={colors.green.medium} />}
                rightIcon={<Feather name="menu" size={25} color={colors.gray.medium} />}
                volumeIconCallback={() => alert("clicked")}
                showCompleteIndicator={item.isComplete}
                width={childrenWidth}
                height={childrenHeight}
            />
        )
    }

    return (
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
                <AutoDragSortableView
                    dataSource={sampleSelected}
                    parentWidth={parentWidth}
                    childrenWidth={childrenWidth}
                    childrenHeight={childrenHeight}
                    onDataChange={(d) => {
                        console.log(d);
                    }}
                    keyExtractor={(item, index) => index}
                    renderItem={(item, index) => {
                        return renderSelectedItems(item, index)
                    }}
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
                <AutoDragSortableView
                    dataSource={sampleUnselected}
                    parentWidth={parentWidth}
                    childrenWidth={childrenWidth}
                    childrenHeight={childrenHeight}
                    onDataChange={(d) => {
                        console.log(d);
                    }}
                    keyExtractor={(item, index) => index}
                    renderItem={(item, index) => {
                        return renderUnselectedItems(item, index)
                    }}
                />
            </View>
        </ScrollView>
    )
}

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
