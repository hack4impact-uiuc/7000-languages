import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASYNC_STORAGE_ID_TOKEN_KEY } from './constants';


export const loadUserToken = async () => {
    try {
        const userToken = await AsyncStorage.getItem(ASYNC_STORAGE_ID_TOKEN_KEY);
        return userToken;
    } catch (e) {
        console.error(e.message);
    }
}

export const saveUserToken = async (value) => {
    try {
        await AsyncStorage.setItem(ASYNC_STORAGE_ID_TOKEN_KEY, value);
    } catch (e) {
        console.error(e.message);
    }
}

export const removeUserToken = async () => {
    try {
        await AsyncStorage.removeItem(ASYNC_STORAGE_ID_TOKEN_KEY);
    } catch (e) {
        console.error(e.message);
    }
}
