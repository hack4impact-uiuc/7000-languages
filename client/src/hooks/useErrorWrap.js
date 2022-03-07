import { useCallback } from 'react'
import { Alert } from 'react-native'

/**
 * Custom hook that creates an error wrapper. If an error is thrown in the
 * error wrapper, then the global error is set and the error modal automatically
 * appears over the screen. There is a callback for when a request is successfully completed,
 * and a callback when a request errors out.
 */

const defaultSuccessCallback = () => {}
const defaultErrorCallback = () => {}

const useErrorWrap = () => {
  const errorWrapper = useCallback(
    async (
      func,
      successCallback = defaultSuccessCallback,
      errorCallback = defaultErrorCallback,
    ) => {
      try {
        if (func) await func()
        successCallback()
      } catch (error) {
        console.error(error)
        Alert.alert('Error', error.message, [
          { text: 'OK', onPress: () => errorCallback() },
        ])
      }
    },
    [],
  )

  return errorWrapper
}

export default useErrorWrap
