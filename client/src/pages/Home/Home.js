import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { NO_COURSE_ID } from 'utils/constants'
import HomeBaseCase from 'components/HomeBaseCase'
import { setField, clearCourseData } from 'slices/language.slice'
import { useDispatch, useSelector } from 'react-redux'
import CourseHome from 'pages/CourseHome'
import LearnerCourseHome from 'pages/LearnerCourseHome'
import { getCourse } from 'api'
import { useErrorWrap, useTrackPromise } from 'hooks'
import i18n from 'utils/i18n'

const Home = ({ navigation, courseId }) => {
  const dispatch = useDispatch()

  const errorWrap = useErrorWrap()
  const trackPromise = useTrackPromise()

  const { currentCourseId, allCourses } = useSelector((state) => state.language)

  const [courseDescription, setCourseDescription] = useState('')
  const [courseName, setCourseName] = useState('')

  // Handles logic with fetching the intitial data required to render the Course Home Page
  useEffect(() => {
    // Gets the course data from the API
    const getCourseData = async (id) => {
      errorWrap(async () => {
        const { result } = await trackPromise(getCourse(id))
        const { course, units } = result

        setCourseDescription(course.details.description)
        setCourseName(course.details.name)

        // Sets the title of the page
        navigation.setOptions({
          title: `${i18n.t('dict.courseHome')}`,
        })
        dispatch(setField({ key: 'courseDetails', value: course.details }))
        dispatch(setField({ key: 'allUnits', value: units }))
      })
    }

    // When the Home Page is presented for a specific course, we need to fetch its course data
    const unsubscribe = navigation.addListener('focus', async () => {
      // Only fetch data if we were on a previous course page before, and this page isn't for the default Home Base Case page
      if (!(courseId === NO_COURSE_ID || currentCourseId === NO_COURSE_ID)) {
        if (courseId !== currentCourseId) {
          dispatch(clearCourseData()) // Since we are switching courses, we need to clear all of the existing course data saved in state
          dispatch(setField({ key: 'currentCourseId', value: courseId }))

          await getCourseData(courseId)
        }
      }
    })

    return unsubscribe
  }, [navigation, currentCourseId, courseId, setField])

  if (courseId === NO_COURSE_ID || currentCourseId === NO_COURSE_ID) {
    return <HomeBaseCase navigation={navigation} />
  }

  // Check if this course is a Learner Course or a Contributor Course

  const courseIndex = allCourses.findIndex((course) => course._id === courseId);

  if (courseIndex >= 0 && !allCourses[courseIndex].isContributor) {
    return <LearnerCourseHome
      navigation={navigation}
      courseId={courseId}
      courseName={courseName}
      courseDescription={courseDescription}
    />
  }

  return (
    <CourseHome
      navigation={navigation}
      courseId={courseId}
      courseName={courseName}
      courseDescription={courseDescription}
    />
  )
}
Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    addListener: PropTypes.func,
    setOptions: PropTypes.func,
  }),
  courseId: PropTypes.string,
}

Home.defaultProps = {
  navigation: {
    navigate: () => null,
    addListener: () => null,
    setOptions: () => null,
  },
  courseId: NO_COURSE_ID,
}
export default Home
