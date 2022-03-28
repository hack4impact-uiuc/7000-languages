import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Text, Divider } from 'native-base'
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native'
import StyledButton from 'components/StyledButton'
import { colors } from 'theme'
import StyledCard from 'components/StyledCard'
import { Feather, AntDesign } from '@expo/vector-icons'
import { AutoDragSortableView } from 'react-native-drag-sort'
import lodash from 'lodash'
import {
  DRAGGABLE_LIST_COMPONENT_DELAY,
  DRAGGABLE_LIST_CARD_WIDTH_FACTOR,
  DRAGGABLE_LIST_CARD_HEIGHT,
} from 'utils/constants'

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
    alignItems: 'center',
  },
  save: {
    backgroundColor: colors.white.dark,
    flexDirection: 'row',
    justifyContent: 'center',
  },
})

const { width } = Dimensions.get('window')

const parentWidth = width
const childrenWidth = width + DRAGGABLE_LIST_CARD_WIDTH_FACTOR
const childrenHeight = DRAGGABLE_LIST_CARD_HEIGHT

const ManageView = ({
  selectedTitleText,
  unselectedTitleText,
  selectedBodyText,
  unselectedBodyText,
  addText,
  saveCallback,
  addCallback,
  initialSelectedData,
  initialUnselectedData,
  playAudio,
}) => {
  const [selectedData, setSelectedData] = useState(initialSelectedData)
  const [unselectedData, setUnselectedData] = useState(initialUnselectedData)

  /**
   * The useRef hook is used to increase performance and user experience when using this component.
   * - scrollViewRef is used to prevent scrolling when using draggable components.
   * - selectedDraggableListRef and unselectedDraggableListRef are used to limit the re-rendering of
   * the draggable components and decrease the time it takes to drag and drop a card.
   *
   * Draggable Component:
   * - https://github.com/mochixuan/react-native-drag-sort
   */
  const scrollViewRef = useRef(null)
  const selectedDraggableListRef = useRef(null)
  const unselectedDraggableListRef = useRef(null)

  /**
   * Fetches the data saved to the state of the draggable list components
   */
  const getData = () => {
    const selected = selectedDraggableListRef.current.state.dataSource.map(
      (data) => data.data,
    )
    const unselected = unselectedDraggableListRef.current.state.dataSource.map(
      (data) => data.data,
    )
    return { selected, unselected }
  }

  /**
   * Updates the selected and unselected data after an operation on both lists
   */
  const updateData = (newSelectedData, newUnselectedData) => {
    setSelectedData(newSelectedData)
    setUnselectedData(newUnselectedData)
  }

  /**
   * Moves data from unselectedData to selectedData
   * @param {Number} index Index of the data to move in unselectedData
   */
  const moveToSelected = (index) => {
    const data = getData()
    const updatedUnselectedData = lodash.cloneDeep(data.unselected)
    const updatedSelectedData = lodash.cloneDeep(data.selected)
    const removedData = updatedUnselectedData.splice(index, 1)
    updatedSelectedData.push(removedData[0])

    updateData(updatedSelectedData, updatedUnselectedData)
  }

  /**
   * Moves data from unselectedData to selectedData
   * @param {Number} index Index of the data to move in unselectedData
   */
  const moveToUnselected = (index) => {
    const data = getData()
    const updatedUnselectedData = lodash.cloneDeep(data.unselected)
    const updatedSelectedData = lodash.cloneDeep(data.selected)
    const removedData = updatedSelectedData.splice(index, 1)
    updatedUnselectedData.push(removedData[0])

    updateData(updatedSelectedData, updatedUnselectedData)
  }

  /**
   * Generates the card for one selected item in a draggable list
   * @param {Object} item  Selected Item data
   * @param {Number} index Index of the data in the draggable list
   * @returns Generated Component
   */
  const renderSelectedItems = (item, index) => (
    <StyledCard
      titleText={item.title}
      bodyText={item.body}
      leftIcon={
        <AntDesign
          name="minuscircle"
          size={20}
          color={colors.red.dark}
          onPress={() => moveToUnselected(index)}
        />
      }
      rightIcon={<Feather name="menu" size={25} color={colors.gray.medium} />}
      volumeIconCallback={playAudio}
      showCompleteIndicator={item.isComplete}
      width={childrenWidth}
      height={childrenHeight}
    />
  )

  /**
   * Generates the card for one unselected item in a draggable list
   * @param {Object} item  Unselected Item data
   * @param {Number} index Index of the data in the draggable list
   * @returns Generated Component
   */
  const renderUnselectedItems = (item, index) => (
    <StyledCard
      titleText={item.title}
      bodyText={item.body}
      leftIcon={
        <AntDesign
          name="pluscircle"
          size={20}
          color={colors.green.medium}
          onPress={() => moveToSelected(index)}
        />
      }
      rightIcon={<Feather name="menu" size={25} color={colors.gray.medium} />}
      volumeIconCallback={playAudio}
      showCompleteIndicator={item.isComplete}
      width={childrenWidth}
      height={childrenHeight}
    />
  )

  /**
   * Enables/disables scroll of the Scroll View. Used to disable scroll when using the draggable list component.
   * Source: https://stackoverflow.com/questions/67259797/react-native-scrollview-prevent-allow-scrolling-on-scroll-start-event
   */
  const updateScroll = (isScrollEnabaled) =>
    scrollViewRef.current?.setNativeProps({
      scrollEnabled: isScrollEnabaled,
    })

  /**
   * Fetches the data saved to the state of the draggable list components and passes it up to the parent component
   * Source: https://github.com/mochixuan/react-native-drag-sort/blob/master/lib/AutoDragSortableView.js
   */
  const saveData = () => {
    const data = getData()
    saveCallback(data.selected, data.unselected)
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
        style={styles.root}
      >
        <View style={styles.selected}>
          <View style={styles.header}>
            <Text fontFamily="heading" fontWeight="regular" fontSize="xl">
              {selectedTitleText}
            </Text>
            <StyledButton
              title={addText}
              variant="small"
              fontSize="md"
              rightIcon={
                <AntDesign
                  name="pluscircle"
                  size={18}
                  color={colors.red.dark}
                />
              }
              onPress={addCallback}
            />
          </View>
          <Text
            fontFamily="body"
            fontWeight="regular"
            fontSize="md"
            color="gray.medium"
          >
            {selectedBodyText}
          </Text>
          <AutoDragSortableView
            ref={selectedDraggableListRef}
            dataSource={selectedData}
            parentWidth={parentWidth}
            childrenWidth={childrenWidth}
            childrenHeight={childrenHeight}
            delayLongPress={DRAGGABLE_LIST_COMPONENT_DELAY}
            keyExtractor={(item, index) => index}
            renderItem={(item, index) => renderSelectedItems(item, index)}
            onDragStart={() => {
              updateScroll(false)
            }}
            onDragEnd={() => {
              updateScroll(true)
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
          <Text
            fontFamily="body"
            fontWeight="regular"
            fontSize="md"
            color="gray.medium"
          >
            {unselectedBodyText}
          </Text>
          <AutoDragSortableView
            ref={unselectedDraggableListRef}
            dataSource={unselectedData}
            parentWidth={parentWidth}
            childrenWidth={childrenWidth}
            childrenHeight={childrenHeight}
            delayLongPress={DRAGGABLE_LIST_COMPONENT_DELAY}
            keyExtractor={(item, index) => index}
            renderItem={(item, index) => renderUnselectedItems(item, index)}
            onDragStart={() => {
              updateScroll(false)
            }}
            onDragEnd={() => {
              updateScroll(true)
            }}
          />
        </View>
      </ScrollView>
      <View style={styles.save}>
        <StyledButton
          title="Save Changes"
          variant="primary"
          fontSize="md"
          onPress={saveData}
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
  initialSelectedData: PropTypes.arrayOf(PropTypes.Object),
  initialUnselectedData: PropTypes.arrayOf(PropTypes.Object),
  playAudio: PropTypes.func,
}

ManageView.defaultProps = {
  selectedTitleText: '',
  unselectedTitleText: '',
  selectedBodyText: '',
  unselectedBodyText: '',
  addText: '',
  saveCallback: () => {},
  addCallback: () => {},
  initialSelectedData: [],
  initialUnselectedData: [],
  playAudio: () => {},
}

export default ManageView
