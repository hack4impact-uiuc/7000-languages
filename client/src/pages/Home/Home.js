import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { NO_COURSE_ID } from 'utils/constants'
import HomeBaseCase from '../../components/HomeBaseCase/HomeBaseCase'

const Home = ({ navigation }) => {
  const { currentCourseId } = useSelector((state) => state.language)

  if (currentCourseId === NO_COURSE_ID) {
    return <HomeBaseCase navigation={navigation} />
  }

  // TODO: add logic for rendering course page

  return null
}
Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Home.defaultProps = {
  navigation: { navigate: () => null },
}
export default Home
