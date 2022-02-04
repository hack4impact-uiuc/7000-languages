import axios from 'axios'
import Constants from 'expo-constants';

const BASE_URL = Constants.manifest.extra.apiUrl;

// The configured axios instance to be exported
const instance = axios.create({
  baseURL: BASE_URL,
  validateStatus: () => {
    return true
  },
})

export default instance
