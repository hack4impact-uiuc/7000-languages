import { setAuthToken } from 'api'
import { setToken } from '../../api/axios-config'

const saveAuthToken = () => (next) => (action) => {
  if (action.type === 'auth/authenticate' && action.payload.loggedIn) {
    // after a successful login, update the token in the API
    setToken(action.payload.idToken)
    setAuthToken(action.payload.idToken)
  }
  // continue processing this action
  return next(action)
}

export default saveAuthToken
