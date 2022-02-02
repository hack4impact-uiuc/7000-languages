import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

// The configured axios instance to be exported
const instance = axios.create({
    baseURL: BASE_URL,
    validateStatus: () => {
        return true;
    },
});


export default instance;
