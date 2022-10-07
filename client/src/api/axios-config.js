import axios from 'axios'
import Constants from 'expo-constants'
import { logout } from 'slices/auth.slice'
import store from '../redux/store'
import { loadUserIDToken, refreshIDToken } from '../utils/auth'

const API_URL = Constants.manifest.extra.apiURL
const API_PORT = Constants.manifest.extra.apiDevelopmentPort

// Source: https://stackoverflow.com/questions/47417766/calling-locally-hosted-server-from-expo-app/70964774
export const BASE_URL =
  API_URL ||
  `http://${Constants.manifest.debuggerHost.split(':').shift()}:${API_PORT}`

// The configured axios instance to be exported
const instance = axios.create({
  baseURL: BASE_URL,
  validateStatus: () => true,
})

/**
 * Appends an authorization header to the request
 * @param {AxiosRequestConfig<any>} config
 * @returns {Promise<AxiosRequestConfig<any>>} updated config
 */
const addAuthHeader = async (config) =>
  loadUserIDToken().then((idToken) => {
    const updateConfig = config
    if (idToken) {
      updateConfig.headers.Authorization = `Bearer ${idToken}`
    }
    return Promise.resolve(updateConfig)
  })
/**
 *
 * @param {AxiosResponse<any, any>} response
 * @returns {Promise<AxiosResponse<any, any>>} retried response if auth was expired or original response otherwise
 */
const authRefresh = async (response) => {
  const status = response ? response.status : null
  if (status === 401) {
    return refreshIDToken().then((newToken) => {
      if (newToken != null) {
        response.config.headers.Authorization = `Bearer ${newToken}`
        response.config.baseURL = undefined
        return instance.request(response.config)
      }
      // Unable to retrieve new idToken -> Prompt log in again
      store.dispatch(logout())
      return response
    })
  }

  return response
}

instance.interceptors.request.use(addAuthHeader)
instance.interceptors.response.use(authRefresh)

export default instance
