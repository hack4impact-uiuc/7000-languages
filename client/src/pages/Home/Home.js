import React from 'react'
import PropTypes from 'prop-types'
// import HomeBaseCase from '../../components/HomeBaseCase/HomeBaseCase'
import CourseNavHome from 'components/CourseNavHome'

const Home = ({ navigation }) => <CourseNavHome navigation={navigation}></CourseNavHome>
{/* <HomeBaseCase navigation={navigation} /> */}
Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Home.defaultProps = {
  navigation: { navigate: () => null },
}
export default Home
