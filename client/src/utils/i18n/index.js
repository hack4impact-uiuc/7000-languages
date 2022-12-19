import { I18n } from 'i18n-js'
import translations from './translations'
import { retrieveLanguage, getDeviceLocale } from './utils'

const i18n = new I18n(translations)

const setAppLanguage = async () => {
  /* Sets the app language based on what is saved in SecureStore and what the
  default language of the user's phone (locale) is. */
  const savedLanguage = await retrieveLanguage()

  if (savedLanguage === null) {
    // Default to device locale
    i18n.locale = getDeviceLocale()
  } else {
    // Reference SecureStore saved value
    i18n.locale = savedLanguage
  }
}

i18n.enableFallback = true

setAppLanguage()

export default i18n
