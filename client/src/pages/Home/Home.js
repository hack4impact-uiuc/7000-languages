import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import Button from 'components/Button'
import { colors } from 'theme'
import { getSampleData } from 'api'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGray,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: 'GT_Haptik_oblique',
  },
})

const Home = ({ navigation }) => {
  const [text, setText] = useState("Go to Details");

  console.log("did it work?")

  useEffect(() => {
    console.log("do logs work????");
    const getData = async () => {
      let data = await getSampleData();
      console.log(data);
    };
    // getData();
  }, [setText])

  return (<View style={styles.root}>
    <StatusBar barStyle="light-content" />
    <Text style={styles.title}>Home</Text>
    <Button
      title={text}
      color="white"
      backgroundColor={colors.gold}
      onPress={() => {
        navigation.navigate('Details', { from: 'Home' })
      }}
    />
  </View>)
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
