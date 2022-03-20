import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, Text, View, StatusBar,
} from 'react-native'
import StyledButton from 'components/StyledButton'
import { colors } from 'theme'
import { AutoDragSortableView } from 'react-native-drag-sort'
import { Dimensions, Image, SafeAreaView } from 'react-native'

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
const childrenHeight = 48

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray.light,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  header: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#2ecc71',
    borderBottomWidth: 2,
  },
  header_title: {
    color: '#333',
    fontSize: 24,
    fontWeight: 'bold',
  },
  item: {
    width: childrenWidth,
    height: childrenHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2ecc71',
    borderRadius: 4,
  },
  item_icon_swipe: {
    width: childrenHeight - 10,
    height: childrenHeight - 10,
    backgroundColor: '#fff',
    borderRadius: (childrenHeight - 10) / 2,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item_icon: {
    width: childrenHeight - 20,
    height: childrenHeight - 20,
    resizeMode: 'contain',
  },
  item_text: {
    color: '#fff',
    fontSize: 20,
    marginRight: 20,
    fontWeight: 'bold',
  }
})

const Profile = ({ navigation }) => {

  const [data, setData] = useState([{ icon: "", txt: 1 }, { icon: "", txt: 2 }, { icon: "", txt: 3 }, { icon: "", txt: 4 }, { icon: "", txt: 5 }]);

  const renderItem = (item, index) => {
    return (
      <View style={styles.item}>
        {/* <View style={styles.item_icon_swipe}>
          <Image style={styles.item_icon} source={item.icon} />
        </View> */}
        <Text style={styles.item_text}>{item.txt}</Text>
      </View>
    )
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Profile</Text>
      <StyledButton
        title="Go to Details"
        variant="primary"
        onPress={() => {
          navigation.navigate('Details', { from: 'Profile' })
        }}
      />

      <AutoDragSortableView
        dataSource={data}
        parentWidth={parentWidth}
        childrenWidth={childrenWidth}
        marginChildrenBottom={10}
        marginChildrenRight={10}
        marginChildrenLeft={10}
        marginChildrenTop={10}
        childrenHeight={childrenHeight}

        onDataChange={(d) => {
          console.log(d);
          if (d.length != data.length) {
            setData(d);
          }
        }}
        keyExtractor={(item, index) => item.txt}
        renderItem={(item, index) => {
          return renderItem(item, index)
        }}
      />

    </View>
  )
}

Profile.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }),
}

Profile.defaultProps = {
  navigation: { navigate: () => null },
}

export default Profile
