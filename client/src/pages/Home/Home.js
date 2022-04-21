import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { NO_COURSE_ID } from 'utils/constants'
import HomeBaseCase from 'components/HomeBaseCase'
import { Text } from 'native-base'
import { setCurrentCourse } from 'slices/language.slice'
import { useDispatch } from 'react-redux'

const Home = ({ navigation, courseId }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      dispatch(setCurrentCourse({ currentCourseId: courseId }))
    })

    return unsubscribe
  }, [navigation])

  if (courseId === NO_COURSE_ID) {
    return <HomeBaseCase navigation={navigation} />
  }

  // TODO: add logic for rendering course page
  return <Text>{courseId}</Text>
}
Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    addListener: PropTypes.func,
  }),
  courseId: PropTypes.string,
}

Home.defaultProps = {
  navigation: { navigate: () => null, addListener: () => null },
  courseId: NO_COURSE_ID,
}
export default Home
