import { I18n } from 'i18n-js'
import translations from './translations'

const i18n = new I18n(translations)

/* This is a function to map the locale to an existing language on our languageData json object. i.e. fr_DZ -> fr */
const convertLanguage = (locale) => {
  var to_ret = ''
  locale.indexOf('fr') >= 0 ? (to_ret = 'fr') : (to_ret = 'en')
  return to_ret
}

import { NativeModules, Platform } from 'react-native'

const locale =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier

i18n.enableFallback = true
i18n.locale = convertLanguage(locale)

export default i18n
