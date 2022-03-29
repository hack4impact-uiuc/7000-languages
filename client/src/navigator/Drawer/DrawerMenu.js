import React from 'react'
import PropTypes from 'prop-types'
import { View, SafeAreaView } from 'react-native'
import { Text } from 'native-base'
import { DrawerActions } from '@react-navigation/native'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { colors } from 'theme'
const styles = {
  root: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    marginTop: '8%',
    marginBottom: '8%',
    height: 1,
    backgroundColor: '#C0C0C0',
    width: '65%',
  },
}

const DrawerMenu = ({ navigation }) => (
  <SafeAreaView style={styles.head}>
    <View style={styles.root}>
    <Text
      style={{
        fontFamily: 'GT_Haptik_bold',
        paddingBottom: 10,
      }}
      fontWeight="regular"
      color="black"
      fontSize="25px"
    >
      My Languages
    </Text>
    </View>
    <View style={styles.head}>
      <FontIcon.Button
        name="times"
        size={20}
        color={colors.gray.dark}
        backgroundColor="white"
        onPress={() => {
          navigation.dispatch(DrawerActions.closeDrawer())
        }}
      />
    </View>
    
    
  </SafeAreaView>
)

DrawerMenu.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
  }),
}

DrawerMenu.defaultProps = {
  navigation: {
    dispatch: () => null,
  },
}

export default DrawerMenu
