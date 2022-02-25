import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux'
import { authenticate, saveToken, removeToken } from 'slices/auth.slice'
import { ASYNC_STORAGE_ID_TOKEN_KEY } from './constants';

const dispatch = useDispatch()

export const getUserToken = async () => {
    try {
        const userToken = await AsyncStorage.getItem(ASYNC_STORAGE_ID_TOKEN_KEY, value)
        if (value != null) {
            dispatch(saveToken(userToken));
            dispatch(authenticate(true));
        } else {
            dispatch(authenticate(false));
        }
    } catch (e) {
        console.error(e.message);
        dispatch(authenticate(false));
    }
}

export const removeUserToken = async () => {
    try {
        await AsyncStorage.removeToken(ASYNC_STORAGE_ID_TOKEN_KEY);
        dispatch(authenticate(false));
        dispatch(removeToken())
    } catch (e) {
        console.error(e.message);
        dispatch(authenticate(false));
    }
}
