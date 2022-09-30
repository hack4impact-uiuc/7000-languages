import axios from 'axios'
import Constants from 'expo-constants'
import { loadUserIDToken, refreshIDToken } from '../utils/auth'

const API_URL = Constants.manifest.extra.apiURL
const API_PORT = Constants.manifest.extra.apiDevelopmentPort

// Source: https://stackoverflow.com/questions/47417766/calling-locally-hosted-server-from-expo-app/70964774
export const BASE_URL = API_URL || `http://${Constants.manifest.debuggerHost.split(':').shift()}:${API_PORT}`

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
const addAuthHeader = async (config) => {
  const updatedConfig = config
  loadUserIDToken().then((idToken) => {
    if (idToken) {
      updatedConfig.headers.Authorization = `Bearer ${idToken}`
    }
    return updatedConfig
  })
}
/**
 *
 * @param {AxiosResponse<any, any>} response
 * @returns {Promise<AxiosResponse<any, any>>} retried response if auth was expired or original response otherwise
 */
const authRefresh = async (response) => {
  const status = response ? response.status : null
  if (status === 401) {
    return refreshIDToken().then((newToken) => {
      if (newToken) {
        response.config.headers.Authorization = `Bearer ${newToken}`
        response.config.baseURL = undefined
        return instance.request(response.config)
      }
      return response
    })
  }

  return response
}

instance.interceptors.request.use(addAuthHeader)
instance.interceptors.response.use(authRefresh, (error) => error)

export default instance
