import axios from 'axios'
import Constants from 'expo-constants'

const API_PORT = Constants.manifest.extra.apiDevelopmentPort

// Source: https://stackoverflow.com/questions/47417766/calling-locally-hosted-server-from-expo-app/70964774
export const BASE_URL = `http://${Constants.manifest.debuggerHost
  .split(':')
  .shift()}:${API_PORT}`

// The configured axios instance to be exported
const instance = axios.create({
  baseURL: BASE_URL,
  validateStatus: () => true,
})

let cachedJWTToken = null

export const setToken = (token) => {
  cachedJWTToken = token
}

/**
 * Appends an authorization header to the request
 */
const addAuthHeader = async (config) => {
  const updatedConfig = config

  // Add JWT Token to header
  if (cachedJWTToken)
    updatedConfig.headers.Authorization = `Bearer ${cachedJWTToken}`

  return updatedConfig
}

instance.interceptors.request.use(addAuthHeader)

export default instance
