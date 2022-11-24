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
 * @param {String} mediaType Image or Audio
 * @returns
 */
const getAsyncStorageKeyGivenMediaType = (vocabID, mediaType) => `${vocabID}/${mediaType}`

/*
 * Removes a vocab id and file URI mapping from Async Storage and Expo FileSystem
 * @param {String} vocabID Unique MongoDB ID of Vocab Item
 * @param {String} mediaType Image or Audio
 * @param {Boolean} shouldDeleteFromExpo true if the file should also get deleted from Expo.
 * @returns true if successful, false otherwise
 */
export const deleteFileURI = async (
  vocabID,
  mediaType,
  shouldDeleteFromExpo = true,
) => {
  const key = getAsyncStorageKeyGivenMediaType(vocabID, mediaType)
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
 * @param {String} mediaType Image or Audio
 * @returns Expo FileSystem URI or null, along with an boolean
 * indicating if this file URI should get refetched from the API
 */
export const getFileURI = async (vocabID, mediaType) => {
  const key = getAsyncStorageKeyGivenMediaType(vocabID, mediaType)
  const fileURI = await AsyncStorage.getItem(key)

  if (fileURI) {
    // Check when was the last time this file was updated
    const fileInfo = await FileSystem.getInfoAsync(fileURI)
    if (!fileInfo.exists) {
      deleteFileURI(vocabID, mediaType, false)
      return {
        fileURI,
        shouldRefresh: true,
      }
    }

    // If too much time has passed, we indicated that the file needs to get refreshed (fetched from the API again)
    const timeDifference = Date.now() / 1000 - fileInfo.modificationTime

    if (timeDifference >= INVALIDATION_SECONDS) {
      return {
        fileURI,
        shouldRefresh: true,
      }
    }

    // Valid file URI
    return {
      fileURI,
      shouldRefresh: false,
    }
  }

  // No file URI saved
  return {
    fileURI: null,
    shouldRefresh: true,
  }
}

/**
 * Adds the file URI of a vocab item.
 * @param {String} vocabID Unique MongoDB ID of Vocab Item
 * @param {String} fileURI Expo FileSystem URI
 * @param {String} mediaType Unique MongoDB ID of Vocab Item
 * @returns true if successful, false otherwise
 */
export const setFileURI = async (vocabID, fileURI, mediaType) => {
  const key = getAsyncStorageKeyGivenMediaType(vocabID, mediaType)

  try {
    await AsyncStorage.setItem(key, fileURI)
    return true
  } catch (error) {
    console.error('setFileURI(): ', error)
    return false
  }
}
