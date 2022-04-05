/* eslint-disable import/prefer-default-export */
import _ from 'lodash'

/**
 * Moves an element from a source list to a destination list
 * @param {List} srcList
 * @param {List} destList
 * @param {Number} index Index of element in srcList to move
 * @returns source and destination list
 */
export const moveFromList = (srcList, destList, index) => {
  const src = _.cloneDeep(srcList)
  const dest = _.cloneDeep(destList)
  const removedData = src.splice(index, 1)
  dest.push(removedData[0])
  return { src, dest }
}
