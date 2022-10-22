// imports to test localization
// import * as Localization from 'expo-localization'
import { I18n } from 'i18n-js'
import translations from './translations'

const i18n = new I18n(translations)

// Set the locale once at the beginning of your app.
// i18n.locale = Localization.locale

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.enableFallback = true
// To see the fallback mechanism uncomment line below to force app to use French language.
i18n.locale = 'en'

export default i18n
