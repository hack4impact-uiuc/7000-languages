import React from 'react'
import PropTypes from 'prop-types'
// import HomeBaseCase from '../../components/HomeBaseCase/HomeBaseCase'
import CourseHome from 'pages/CourseHome'
// import UnitHome from 'pages/UnitHome'

const Home = ({ navigation }) => <CourseHome navigation={navigation}></CourseHome>
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
