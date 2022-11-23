import AsyncStorage from '@react-native-async-storage/async-storage'
import * as FileSystem from 'expo-file-system'

/**
 * This file contains helper methods related to caching a mapping from vocab items their
 * audio and image files that are stored in Expo FileSystem. This mapping is stored in AsyncStorage,
 * and is used to limit the number of GET calls required for fetching image and audio files from the API.
 */

/* Represents the amount of time in seconds that have to pass before a cached file is invalidated */
const INVALIDATION_SECONDS = 60 * 60 * 24

/**
 * Returns the AsyncStorage key encoding given a vocab item and its associated file
 * @param {String} vocabID Unique MongoDB ID of Vocab Item
 * @param {String} fileType Image or Audio
 * @returns
 */
const getGetGivenType = (vocabID, fileType) => {
  switch (fileType) {
    case 'audio':
      return `${vocabID}/audio`
    case 'image':
      return `${vocabID}/image`
    default:
      throw new Error('No file type provided')
  }
}

/**
 * Removes a vocab id and file URI mapping from Async Storage and Expo FileSystem
 * @param {String} vocabID Unique MongoDB ID of Vocab Item
 * @param {String} fileType Unique MongoDB ID of Vocab Item
 * @param {Boolean} shouldDeleteFromExpo true if the file should also get deleted from Expo.
 * @returns true if successful, false otherwise
 */
export const deleteFileURI = async (
  vocabID,
  fileType,
  shouldDeleteFromExpo = true,
) => {
  const key = getGetGivenType(vocabID, fileType)
  const fileURI = await AsyncStorage.getItem(key)

  if (fileURI) {
    try {
      if (shouldDeleteFromExpo) {
        await FileSystem.deleteAsync(fileURI)
      }

      await AsyncStorage.removeItem(key)

      return true
    } catch (error) {
      console.error('deleteFileURI(): ', error)
      return false
    }
  }
  return true
}

/**
 * Gets the file URI of a vocab item. Returns null if no URI is saved in Async Storage.
 * @param {String} vocabID Unique MongoDB ID of Vocab Item
 * @param {String} fileType Image or Audio
 * @returns Expo FileSystem URI or null, along with an boolean
 * indicating if this file URI should get refetched from the API
 */
export const getFileURI = async (vocabID, fileType) => {
  const key = getGetGivenType(vocabID, fileType)
  const fileURI = await AsyncStorage.getItem(key)

  if (fileURI) {
    // Check when was the last time this file was updated
    const fileInfo = await FileSystem.getInfoAsync(fileURI)
    if (!fileInfo.exists) {
      deleteFileURI(vocabID, fileType, false)
      return {
        fileURI,
        shouldRefresh: true,
      }
    }

    // If too much time has passed, we remove the file from Ascync Storage and Expo FileSystem
    const timeDifference = Date.now() / 1000 - fileInfo.modificationTime

    if (timeDifference >= INVALIDATION_SECONDS) {
      return {
        fileURI,
        shouldRefresh: true,
      }
    }
  }

  return {
    fileURI,
    shouldRefresh: false,
  }
}

/**
 * Adds the file URI of a vocab item.
 * @param {String} vocabID Unique MongoDB ID of Vocab Item
 * @param {String} fileURI Expo FileSystem URI
 * @param {String} fileType Unique MongoDB ID of Vocab Item
 * @returns true if successful, false otherwise
 */
export const putFileURI = async (vocabID, fileURI, fileType) => {
  const key = getGetGivenType(vocabID, fileType)
  try {
    await AsyncStorage.setItem(key, fileURI)
    return true
  } catch (error) {
    console.error('putFileURI(): ', error)
    return false
  }
}
