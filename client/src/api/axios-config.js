import axios from 'axios'
import Constants from 'expo-constants'

const API_PORT = Constants.manifest.extra.developmentApiPort

// Source: https://stackoverflow.com/questions/47417766/calling-locally-hosted-server-from-expo-app/70964774
const BASE_URL = `http://${Constants.manifest.debuggerHost
  .split(':')
  .shift()}:${API_PORT}`;

// The configured axios instance to be exported
const instance = axios.create({
  baseURL: BASE_URL,
  validateStatus: () => true,
})

let cachedJWTToken = null;

export const setToken = (token) => {
  cachedJWTToken = token;
}

/**
 * Appends an authorization header to the request
 */
const addAuthHeader = async (config) => {
  const updatedConfig = config;

  // Add JWT Token to header
  if (cachedJWTToken)
    updatedConfig.headers.Authorization = `Bearer ${cachedJWTToken}`;

  return updatedConfig;
};

/**
 * Called when a request returns an error.
 * Set the token to null in case it was caused by an old auth token.
 */
const onRequestError = (error) => {
  return Promise.reject(error);
};

instance.interceptors.request.use(onRequestError, addAuthHeader);

export default instance
