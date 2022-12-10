import * as SecureStore from 'expo-secure-store'
import { NativeModules, Platform } from 'react-native'
import { ENGLISH, FRENCH, SPANISH, CURRENT_LANGUAGE } from 'utils/constants'

export const storeLanguage = async (language) => {
  /**
   * Saves the app language in SecureStore
   */
  try {
    await SecureStore.setItemAsync(CURRENT_LANGUAGE, language)
  } catch (error) {
    console.error('storeLanguage(): ', error)
  }
}

export const retrieveLanguage = async () => {
  /**
   * Gets the saved app language from SecureStore
   */
  try {
    const savedLanguage = await SecureStore.getItemAsync(CURRENT_LANGUAGE)
    return savedLanguage
  } catch (error) {
    console.error('retrieveLanguage(): ', error)
    return null
  }
}

/* This is a function to map the locale to an existing language on our languageData json object. i.e. fr_DZ -> fr */
const convertLanguage = (locale) => {
  let selectedLocale = ENGLISH;

  if (locale.indexOf(FRENCH) >= 0) {
    selectedLocale = FRENCH;
  } else if (locale.indexOf(SPANISH) >= 0) {
    selectedLocale = SPANISH;
  }

  return selectedLocale;
}

export const getDeviceLocale = () => {
  const locale = Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier

  return convertLanguage(locale)
}
