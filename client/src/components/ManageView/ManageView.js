import React, { useState, useMemo, useRef, HTMLElement } from 'react'
import PropTypes from 'prop-types'
import { Text, Divider } from 'native-base'
import { StyleSheet, View, ScrollView } from 'react-native'
import StyledButton from 'components/StyledButton'
import { colors } from 'theme'
import StyledCard from 'components/StyledCard'
import { Feather, AntDesign } from '@expo/vector-icons'
import { AutoDragSortableView } from 'react-native-drag-sort'
import { Dimensions, Image, SafeAreaView } from 'react-native'
import _ from 'lodash'
import { DRAGGABLE_LIST_COMPONENT_DELAY } from 'utils/constants'

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
        alignItems: 'center'
    },
    save: {
        backgroundColor: colors.white.dark,
        flexDirection: 'row',
        justifyContent: 'center',
    }
})

/* 

1. Memo
2. Draggable
2. Update state with new order of draggable list + pass it up to parent components
3. Remove unncesasry code (Profile) and comments (current plan b old)
4. Add proper documentation in all functions created
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

const ManageView = ({
    selectedTitleText, unselectedTitleText,
    selectedBodyText, unselectedBodyText,
    addText, saveCallback, addCallback, initialSelectedData, initialUnselectedData, playAudio
}) => {
    const [selectedData, setSelectedData] = useState(initialSelectedData);
    const [unselectedData, setUnselectedData] = useState(initialUnselectedData);
    const scrollViewRef = useRef(null);

    const updateData = (newSelectedData, newUnselectedData) => {
        setSelectedData(newSelectedData);
        setUnselectedData(newUnselectedData);
    }

    /**
     * Moves data from unselectedData to selectedData
     * @param {Number} index Index of the data to move in unselectedData
     */
    const moveToSelected = (index) => {
        const updatedUnselectedData = _.cloneDeep(unselectedData);
        const updatedSelectedData = _.cloneDeep(selectedData);
        const removedData = updatedUnselectedData.splice(index, 1);
        updatedSelectedData.push(removedData[0]);

        updateData(updatedSelectedData, updatedUnselectedData);
    }

    /**
     * Moves data from unselectedData to selectedData
     * @param {Number} index Index of the data to move in unselectedData
     */
    const moveToUnselected = (index) => {
        const updatedUnselectedData = _.cloneDeep(unselectedData);
        const updatedSelectedData = _.cloneDeep(selectedData);
        const removedData = updatedSelectedData.splice(index, 1);
        updatedUnselectedData.push(removedData[0]);

        updateData(updatedSelectedData, updatedUnselectedData);
    }

    /**
     * Generates the card for one selected item in a draggable list
     * @param {Object} item  Selected Item data
     * @param {Number} index Index of the data in the draggable list
     * @returns Generated Component
     */
    const renderSelectedItems = (item, index) => {
        return (
            <StyledCard
                titleText={item.title}
                bodyText={item.body}
                leftIcon={<AntDesign name="minuscircle" size={20} color={colors.red.dark} onPress={() => moveToUnselected(index)} />}
                rightIcon={<Feather name="menu" size={25} color={colors.gray.medium} />}
                volumeIconCallback={playAudio}
                showCompleteIndicator={item.isComplete}
                width={childrenWidth}
                height={childrenHeight}
            />
        )
    }

    /**
     * Generates the card for one unselected item in a draggable list
     * @param {Object} item  Unselected Item data
     * @param {Number} index Index of the data in the draggable list
     * @returns Generated Component
     */
    const renderUnselectedItems = (item, index) => {
        return (
            <StyledCard
                titleText={item.title}
                bodyText={item.body}
                leftIcon={<AntDesign name="pluscircle" size={20} color={colors.green.medium} onPress={() => moveToSelected(index)} />}
                rightIcon={<Feather name="menu" size={25} color={colors.gray.medium} />}
                volumeIconCallback={playAudio}
                showCompleteIndicator={item.isComplete}
                width={childrenWidth}
                height={childrenHeight}
            />
        )
    }

    /**
     * Enables/disables scroll of the Scroll View. Used to disable scroll when using the draggable list component.
     * Source: https://stackoverflow.com/questions/67259797/react-native-scrollview-prevent-allow-scrolling-on-scroll-start-event
     */
    const updateScroll = (isScrollEnabaled) => {
        scrollViewRef.current?.setNativeProps({
            scrollEnabled: isScrollEnabaled
        });
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView ref={scrollViewRef}
                contentContainerStyle={{
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
                            rightIcon={<AntDesign name="pluscircle" size={18} color={colors.red.dark} />}
                            onPress={addCallback}
                        />
                    </View>
                    <Text fontFamily="body" fontWeight="regular" fontSize="md" color="gray.medium">
                        {selectedBodyText}
                    </Text>
                    <AutoDragSortableView
                        dataSource={selectedData}
                        parentWidth={parentWidth}
                        childrenWidth={childrenWidth}
                        childrenHeight={childrenHeight}
                        onDataChange={(d) => {
                            // setFinalSelectedData(d);
                        }}
                        delayLongPress={0.75}
                        keyExtractor={(item, index) => index}
                        renderItem={(item, index) => {
                            return renderSelectedItems(item, index)
                        }}
                        onDragStart={(_) => { updateScroll(false); }}
                        onDragEnd={(_) => { updateScroll(true); }}
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
                        dataSource={unselectedData}
                        parentWidth={parentWidth}
                        childrenWidth={childrenWidth}
                        childrenHeight={childrenHeight}
                        onDataChange={(d) => {
                            // setFinalUnselectedData(d);
                        }}
                        delayLongPress={DRAGGABLE_LIST_COMPONENT_DELAY}
                        keyExtractor={(item, index) => index}
                        renderItem={(item, index) => {
                            return renderUnselectedItems(item, index)
                        }}
                        onDragStart={(_) => { updateScroll(false); }}
                        onDragEnd={(_) => { updateScroll(true); }}
                    />
                </View>
            </ScrollView>
            <View style={styles.save}>
                <StyledButton
                    title="Save Changes"
                    variant="primary"
                    fontSize="md"
                    onPress={saveCallback}
                />
            </View>
        </View>
    )
}

// Button object fields
ManageView.propTypes = {
    selectedTitleText: PropTypes.string,
    unselectedTitleText: PropTypes.string,
    selectedBodyText: PropTypes.string,
    unselectedBodyText: PropTypes.string,
    addText: PropTypes.string,
    saveCallback: PropTypes.func,
    addCallback: PropTypes.func,
    initialSelectedData: PropTypes.array,
    initialUnselectedData: PropTypes.array,
    playAudio: PropTypes.func
}

ManageView.defaultProps = {
    selectedTitleText: '',
    unselectedTitleText: '',
    selectedBodyText: '',
    unselectedBodyText: '',
    addText: '',
    saveCallback: () => { },
    addCallback: () => { },
    initialSelectedData: [],
    initialUnselectedData: [],
    playAudio: () => { }
}

export default ManageView
