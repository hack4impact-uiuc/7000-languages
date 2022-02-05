import axios from 'axios'
import Constants from 'expo-constants';

const API_PORT = Constants.manifest.extra.developmentApiPort;

const uri = `http://${Constants.manifest.debuggerHost.split(':').shift()}:${developmentApiPort}`;

const BASE_URL = uri;

// The configured axios instance to be exported
const instance = axios.create({
  baseURL: BASE_URL,
  validateStatus: () => {
    return true
  },
})

export default instance
