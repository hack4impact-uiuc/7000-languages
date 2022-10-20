import { Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import { setLoading } from 'slices/app.slice'
import { ERROR_ALERT_TITLE } from '../utils/constants'
import i18n from 'utils/LanguageData'

/**
 * Custom hook that creates an error wrapper. If an error is thrown in the
 * error wrapper, then the global error is set and the error modal automatically
 * appears over the screen. There is a callback for when a request is successfully completed,
 * and a callback when a request errors out.
 */

const defaultSuccessCallback = () => {}
const defaultErrorCallback = () => {}

const useErrorWrap = () => {
  const dispatch = useDispatch()

  const errorWrapper = async (
    func,
    successCallback = defaultSuccessCallback,
    errorCallback = defaultErrorCallback,
  ) => {
    try {
      if (func) await func()
      successCallback()
    } catch (error) {
      dispatch(setLoading({ isLoading: false }))
      console.error(`${i18n.t('dialogue.errorCaught')} `, error.message)
      Alert.alert(ERROR_ALERT_TITLE, error.message, [
        {
          text: `${i18n.t('dict.ok')} `,
          onPress: () => errorCallback(),
        },
      ])
    }
  }

  return errorWrapper
}

export default useErrorWrap
