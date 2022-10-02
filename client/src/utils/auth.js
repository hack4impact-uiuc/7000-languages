import * as SecureStore from 'expo-secure-store'
import axios from 'axios'
import {
  SECURE_STORAGE_ID_TOKEN_KEY,
  SECURE_STORAGE_REFRESH_TOKEN_KEY,
  SECURE_STORAGE_CLIENT_ID_KEY,
} from './constants'

const GOOGLE_OAUTH_TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token'

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
 * Obtains a user's Google Client ID from SecureStore
 * @returns {String} The user client id saved in SecureStore
 */
export const loadUserClientId = async () => {
  try {
    const clientId = await SecureStore.getItemAsync(
      SECURE_STORAGE_CLIENT_ID_KEY,
    )
    return clientId
  } catch (e) {
    console.error('loadUserClientId(): ', e.message)
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
 * Saves a user's Google Client Id to SecureStore
 * @param {String} value The users Google Client Id
 * @returns {Boolean} true if the operation was successful
 */
export const saveUserClientId = async (value) => {
  try {
    await SecureStore.setItemAsync(SECURE_STORAGE_CLIENT_ID_KEY, value)
    return true
  } catch (e) {
    console.error('saveUserClientId(): ', e.message)
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
 * Removes a user's Google Client Id from SecureStore
 * @returns {Boolean} true if the operation was successful
 */
export const removeUserClientId = async () => {
  try {
    await SecureStore.deleteItemAsync(SECURE_STORAGE_CLIENT_ID_KEY)
    return true
  } catch (e) {
    console.error('removeUserClientId(): ', e.message)
    return false
  }
}

/**
 * Refreshes the ID token for user using refreshToken from SecureStore
 * @returns {String} new IdToken if refresh is successful
 */
export const refreshIDToken = async () => {
  try {
    const refreshToken = await loadUserRefreshToken()
    const clientId = await loadUserClientId()
    return axios
      .post(GOOGLE_OAUTH_TOKEN_URL, {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        clientId,
      })
      .then(({ data: { id_token: idToken } }) => {
        saveUserIDToken(idToken)
        return Promise.resolve(idToken)
      })
      .catch((reason) => {
        console.error('rejected reauth, reason: ', reason)
        return Promise.resolve(null)
      })
  } catch (e) {
    console.error('refreshIDToken(): ', e.message)
    return Promise.resolve(null)
  }
}
