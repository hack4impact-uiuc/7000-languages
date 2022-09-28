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

let cachedJWTToken = null

export const setToken = (token) => {
  cachedJWTToken = token
}

/**
 * Appends an authorization header to the request
 */
const addAuthHeader = async (config) => {
  const updatedConfig = config
  const cachedJWTToken = await loadUserIDToken()
  // Add JWT Token to header
  if (cachedJWTToken) updatedConfig.headers.Authorization = `Bearer ${cachedJWTToken}`

  return updatedConfig
}

const authReferesh = async (response) => {
  const status = response ? response.status : null;
  if (status === 401) {
    return refreshIDToken().then(newToken => {
      if(newToken) {
        response.config.headers['Authorization'] = `Bearer ${newToken}`;
        response.config.baseURL = undefined;
        return instance.request(response.config);
      } else {
        console.log('Token refresh non successful');
      }
    })
  }

  return response;
} 

instance.interceptors.request.use(addAuthHeader)
instance.interceptors.response.use(authReferesh, (error) => error);

export default instance
