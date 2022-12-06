import { getUser } from 'api'

/**
 * A function that fetches the user's data from the API. It is abstracted out to this file since this API
 * call occurs in more than one place.
 * @returns A user's name, email, profile picture, and courses that they belong to
 */
export const getAllUserCourses = async () => {
  const { result } = await getUser()
  const {
    name,
    email,
    picture,
    adminLanguages,
    collaboratorLanguages,
    learnerLanguages,
  } = result

  let allCourses = []

  // Build list of courses that they belong to
  if (
    adminLanguages.length
    + collaboratorLanguages.length
    + learnerLanguages.length
    > 0
  ) {
    for (let i = 0; i < adminLanguages.length; i += 1) {
      allCourses.push({ ...adminLanguages[i], isContributor: true })
    }

    for (let i = 0; i < collaboratorLanguages.length; i += 1) {
      allCourses.push({
        ...collaboratorLanguages[i],
        isContributor: true,
      })
    }

    for (let i = 0; i < learnerLanguages.length; i += 1) {
      allCourses.push({ ...learnerLanguages[i], isContributor: false })
    }

    allCourses = allCourses.sort((a, b) => a.name.localeCompare(b.name))
  }
  return {
    courses: allCourses,
    picture,
    name,
    email,
  }
}

export const defaultExport = () => undefined
