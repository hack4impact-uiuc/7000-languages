import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const LoadingSpinner = () => {
  const { isLoading } = useSelector((state) => state.app)

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return null
}

export default LoadingSpinner
