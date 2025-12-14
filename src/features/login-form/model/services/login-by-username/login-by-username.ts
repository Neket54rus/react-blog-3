import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { USER_LOCAL_STORAGE_KEY, userActions, type User } from 'entities/user'

import i18n from 'shared/config/i18n/i18n'

interface LoginByUsernameOptions {
    username: string
    password: string
}

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameOptions,
    { rejectValue: string }
>('login/loginByUsername', async (options, thunkApi) => {
    try {
        const { data } = await axios.post<User>(
            'http://localhost:8000/login',
            options,
        )

        if (!data) {
            throw new Error()
        }

        localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(data))
        thunkApi.dispatch(userActions.setAuthData(data))

        return data
    } catch {
        return thunkApi.rejectWithValue(
            i18n.t('Вы ввели неверный логин или пароль!'),
        )
    }
})
