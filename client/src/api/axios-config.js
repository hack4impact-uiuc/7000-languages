import axios from 'axios'
import Constants from 'expo-constants';

const BASE_URL = Constants.manifest.extra.BACKEND_BASE_URL

// The configured axios instance to be exported
const instance = axios.create({
  baseURL: BASE_URL,
  validateStatus: () => {
    return true
  },
})

export default instance
