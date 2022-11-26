import _ from 'lodash'
import { downloadAudioFile } from 'api'
import { MEDIA_TYPE } from 'utils/constants'
import { getFileURI } from 'utils/cache'

/* eslint-disable no-param-reassign */

export const shuffle = (array) => {
  const arrayToShuffle = _.cloneDeep(array)

  for (let i = arrayToShuffle.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = arrayToShuffle[i]
    arrayToShuffle[i] = arrayToShuffle[j]
    arrayToShuffle[j] = temp
  }
  return arrayToShuffle
}

export const getAudioURIGivenVocabItem = async (
  _id,
  audio,
  courseId,
  unitId,
  lessonId,
) => {
  const { fileURI: audioUri, shouldRefresh: shouldRefreshAudio } = await getFileURI(_id, MEDIA_TYPE.AUDIO)

  if (shouldRefreshAudio) {
    const splitPath = audio.split('.')

    // Get the file type from the vocabItem's audio field
    const fileType = splitPath.length === 2 ? splitPath[1] : 'm4a'

    // Downloads audio file and gets Filesystem uri
    const uri = await downloadAudioFile(
      courseId,
      unitId,
      lessonId,
      _id,
      fileType,
    )
    return uri
  }
  return audioUri
}
