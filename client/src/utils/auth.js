import { SECURE_STORAGE_ID_TOKEN_KEY, SECURE_STORAGE_REFRESH_TOKEN_KEY } from './constants'
import * as SecureStore from 'expo-secure-store'

/**
 * Obtains a user's Google ID Token from SecureStore
 * @returns {String} The user token saved in SecureStore
 */
export const loadUserIDToken = async () => {
  try {
    const userToken = await SecureStore.getItemAsync(SECURE_STORAGE_ID_TOKEN_KEY)
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
    const userToken = await SecureStore.getItemAsync(SECURE_STORAGE_REFRESH_TOKEN_KEY)
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
    await SecureStore.setItemAsync(SECURE_STORAGE_ID_TOKEN_KEY, value);
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
    await SecureStore.setItemAsync(SECURE_STORAGE_REFRESH_TOKEN_KEY, value);
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
    console.error('saveUserIDToken(): ', e.message)
    return false
  }
}
