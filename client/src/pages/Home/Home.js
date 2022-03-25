import React from 'react'
import PropTypes from 'prop-types'
// import { authenticate, removeToken } from 'slices/auth.slice'
// import { useDispatch } from 'react-redux'
// import { removeUserIDToken } from '../../utils/auth'
import HomeBaseCase from '../../components/HomeBaseCase/HomeBaseCase'

const Home = ({ navigation }) => (
  <HomeBaseCase navigation={navigation} />
)
Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
}

Home.defaultProps = {
  navigation: { navigate: () => null },
}
export default Home
