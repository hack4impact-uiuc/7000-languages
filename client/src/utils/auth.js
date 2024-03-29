import * as SecureStore from 'expo-secure-store'
import * as AuthSession from 'expo-auth-session'
import Constants from 'expo-constants'
import axios from 'axios'
import {
  SECURE_STORAGE_ID_TOKEN_KEY,
  SECURE_STORAGE_REFRESH_TOKEN_KEY,
} from './constants'

const GOOGLE_OAUTH_TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token'

// The redirect uri must contain the iOS bundle identifier or android package name.
const scheme = Constants.manifest.extra.platform === 'android'
  ? 'com.languages7000.app://'
  : 'com.7000languages.app://'

// Set the redirectUri - this is neccessary for AuthSession.exchangeCodeAsync();
export const redirectUri = AuthSession.makeRedirectUri({
  native: scheme,
  useProxy: true,
})

/**
 * Obtains a user's Google ID Token from SecureStore
 * @returns {String} The user token saved in SecureStore
 */
export const loadUserIDToken = async () => {
  try {
    const userToken = await SecureStore.getItemAsync(
      SECURE_STORAGE_ID_TOKEN_KEY,
    )
    return userToken
  } catch (e) {
    console.error('loadUserIDToken(): ', e.message)
    return null
  }
}

/**
 * Obtains a user's Google Refresh Token from SecureStore
 * @returns {String} The user refresh token saved in SecureStore
 */
export const loadUserRefreshToken = async () => {
  try {
    const userToken = await SecureStore.getItemAsync(
      SECURE_STORAGE_REFRESH_TOKEN_KEY,
    )
    return userToken
  } catch (e) {
    console.error('loadUserRefreshToken(): ', e.message)
    return null
  }
}

/**
 * Saves a user's Google ID Token to SecureStore
 * @param {String} value The users Google ID Token
 * @returns {Boolean} true if the operation was successful
 */
export const saveUserIDToken = async (value) => {
  try {
    await SecureStore.setItemAsync(SECURE_STORAGE_ID_TOKEN_KEY, value)
    return true
  } catch (e) {
    console.error('saveUserIDToken(): ', e.message)
    return false
  }
}

/**
 * Saves a user's Google Refresh Token to SecureStore
 * @param {String} value The users Google Refresh Token
 * @returns {Boolean} true if the operation was successful
 */
export const saveUserRefreshToken = async (value) => {
  try {
    await SecureStore.setItemAsync(SECURE_STORAGE_REFRESH_TOKEN_KEY, value)
    return true
  } catch (e) {
    console.error('saveUserRefreshToken(): ', e.message)
    return false
  }
}

/**
 * Removes a user's Google ID Token from SecureStore
 * @returns {Boolean} true if the operation was successful
 */
export const removeUserIDToken = async () => {
  try {
    await SecureStore.deleteItemAsync(SECURE_STORAGE_ID_TOKEN_KEY)
    return true
  } catch (e) {
    console.error('removeUserIDToken(): ', e.message)
    return false
  }
}

/**
 * Removes a user's Google Refresh Token from SecureStore
 * @returns {Boolean} true if the operation was successful
 */
export const removeUserRefreshToken = async () => {
  try {
    await SecureStore.deleteItemAsync(SECURE_STORAGE_REFRESH_TOKEN_KEY)
    return true
  } catch (e) {
    console.error('removeUserRefreshToken(): ', e.message)
    return false
  }
}

/**
 * Returns the Google Auth Client Id and Client Secret (if exists) based
 * on the app platform (Expo Go, iOS, Android)
 * @returns {String} JSON object containing the Google Auth Client Id (required) and Client Secret (optional)
 */
export const getClientIdAndClientSecret = () => {
  const {
    iosClientId,
    androidClientId,
    expoClientSecret,
    expoClientId,
    platform,
  } = Constants.manifest.extra

  switch (platform) {
    case 'ios':
      return {
        clientId: iosClientId,
      }
    case 'android':
      return {
        clientId: androidClientId,
      }
    default:
      return {
        clientId: expoClientId,
        clientSecret: expoClientSecret,
      }
  }
}

/**
 * @typedef {Object} ExchangeResponse
 * @property {boolean} success - Whether exchange auth code was successful
 * @property {String} message - Response Message
 * @property {String} idToken - idToken exchanged from authorization code
 */

/**
 * Exchanges the authorization_code for idToken and refreshToken
 * @param {String} code
 * @param {String} clientId
 * @param {String} clientSecret
 * @param {String} codeVerifier
 * @returns {ExchangeResponse} Exchange response
 */
export const exchangeAuthCode = async (
  code,
  clientId,
  clientSecret,
  codeVerifier,
) => AuthSession.exchangeCodeAsync(
  {
    code,
    clientId,
    clientSecret,
    redirectUri,
    extraParams: {
      code_verifier: codeVerifier,
    },
  },
  { tokenEndpoint: GOOGLE_OAUTH_TOKEN_URL },
)
  .then(async (authentication) => {
    const { idToken, refreshToken } = authentication
    if (idToken !== null && refreshToken !== null) {
      // id token has to be saved before api calls are made, the other save's can be async
      await saveUserIDToken(idToken)
      saveUserRefreshToken(refreshToken)

      return { success: true, message: 'successfully saved', idToken }
    }
    return {
      success: false,
      message: `idToken or refreshToken is none, authentication result: ${authentication}`,
      idToken: undefined,
    }
  })
  .catch((reason) => ({
    success: false,
    message: `failed to save due to error: ${reason}`,
    idToken: undefined,
  }))

/**
 * Refreshes the ID token for user using refreshToken from SecureStore
 * @returns {String} new IdToken if refresh is successful
 */
export const refreshIDToken = async () => {
  try {
    const refreshToken = await loadUserRefreshToken()

    if (refreshToken === null) {
      return null
    }

    const { clientId, clientSecret } = getClientIdAndClientSecret()

    return axios
      .post(GOOGLE_OAUTH_TOKEN_URL, {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        clientId,
        clientSecret,
      })
      .then(({ data: { id_token: idToken } }) => {
        saveUserIDToken(idToken)
        return Promise.resolve(idToken)
      })
      .catch((reason) => {
        console.error('rejected request for refresh auth with reason: ', reason)
        return Promise.resolve(null)
      })
  } catch (e) {
    console.error('refreshIDToken(): ', e.message)
    return Promise.resolve(null)
  }
}
