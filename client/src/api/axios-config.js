import axios from 'axios'
import Constants from 'expo-constants'

const API_PORT = Constants.manifest.extra.developmentApiPort

const uri = `http://${Constants.manifest.debuggerHost
  .split(':')
  .shift()}:${API_PORT}`

const BASE_URL = uri

// The configured axios instance to be exported
const instance = axios.create({
  baseURL: BASE_URL,
  validateStatus: () => true,
})

export default instance
