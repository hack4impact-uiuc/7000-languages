import AsyncStorage from '@react-native-async-storage/async-storage'
import { ASYNC_STORAGE_ID_TOKEN_KEY } from './constants'

/**
 * Obtains a user's Google ID Token from Async Storage
 * @returns {String} The user token saved in Async Storage
 */
export const loadUserIDToken = async () => {
  try {
    const userToken = await AsyncStorage.getItem(ASYNC_STORAGE_ID_TOKEN_KEY)
    return userToken
  } catch (e) {
    console.error('loadUserIDToken(): ', e.message)
    return null
  }
}

/**
 * Saves a user's Google ID Token to Async Storage
 * @param {String} value The users Google ID Token
 * @returns {Boolean} true if the operation was successful
 */
export const saveUserIDToken = async (value) => {
  try {
    await AsyncStorage.setItem(ASYNC_STORAGE_ID_TOKEN_KEY, value)
    return true
  } catch (e) {
    console.error('saveUserIDToken(): ', e.message)
    return false
  }
}

/**
 * Removes a user's Google ID Token from Async Storage
 * @returns {Boolean} true if the operation was successful
 */
export const removeUserIDToken = async () => {
  try {
    await AsyncStorage.removeItem(ASYNC_STORAGE_ID_TOKEN_KEY)
    return true
  } catch (e) {
    console.error('saveUserIDToken(): ', e.message)
    return false
  }
}
