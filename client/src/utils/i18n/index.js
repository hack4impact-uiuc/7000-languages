import { I18n } from 'i18n-js'
import { NativeModules, Platform } from 'react-native'
import translations from './translations'

const i18n = new I18n(translations)

/* This is a function to map the locale to an existing language on our languageData json object. i.e. fr_DZ -> fr */
const convertLanguage = (locale) => (locale.indexOf('fr') >= 0 ? 'fr' : 'en')

const locale = Platform.OS === 'ios'
  ? NativeModules.SettingsManager.settings.AppleLocale
  : NativeModules.I18nManager.localeIdentifier

i18n.enableFallback = true
i18n.locale = convertLanguage(locale)

export default i18n
