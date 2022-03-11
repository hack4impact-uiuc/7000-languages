import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, StatusBar } from 'react-native'
import StyledButton from 'components/StyledButton'
import { colors } from 'theme'
import { Text } from 'native-base'
import { authenticate, removeToken } from 'slices/auth.slice'
import { useDispatch } from 'react-redux'
import { removeUserIDToken } from '../../utils/auth'
import { AntDesign } from '@expo/vector-icons'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray.light,
  },
})

const Home = ({ navigation }) => {
  const dispatch = useDispatch()

  const logoutUser = async () => {
    await removeUserIDToken()
    dispatch(removeToken())
    dispatch(authenticate({ loggedIn: false }))
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Text
      style={{
        fontFamily:"GT_Haptik_bold",
      }}
        fontWeight="regular"
        color="gray.medium"
        fontSize="2xl"
      >
        Uh, Oh!
      </Text>
      <Text
        fontWeight="regular"
        color="gray.medium"
        fontSize="xl"
        textAlign="center"
        paddingBottom="10px"
      >
        Looks like you don't have a {'\n'} language yet!
      </Text>
      <StyledButton
        title="Search Languages"
        leftIcon= {<AntDesign
          name="search1"
          size={24}
          color={colors.white.dark}
        />}
        variant="primary"
        onPress={() => {
          navigation.navigate('Details', { from: 'Home' })
        }}
      />
      <View 
      style={{
        flexDirection: 'row', 
        alignItems: 'center'}}>
      <View style={{
        marginTop: "8%",
        marginBottom: "8%",
        height: 1, 
        backgroundColor:'#C0C0C0',
        width: '65%'
        }} />
      </View>
      <Text
        fontWeight="regular"
        color="gray.medium"
        fontSize="xl"
        textAlign="center"
        paddingBottom="10px"
      >
        Do you know an indigenous {'\n'} 
        language that you would like to share {'\n'}
        with the world? 
          Apply to become a {'\n'}
        contributer.
      </Text>
      <Text 
      style={{
        fontFamily:"GT_Haptik_bold",
      }}
        fontWeight="regular"
        fontStyle="normal"
        paddingTop="8%"
        paddingBottom="10%"
        color="red.dark"
        fontSize="2xl"
        onPress={() => {
          navigation.navigate('Details', { from: 'Home' })
        }}
      >
        Apply to Contribute
      </Text>

    </View>
  )
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Home.defaultProps = {
  navigation: { navigate: () => null },
}

export default Home
