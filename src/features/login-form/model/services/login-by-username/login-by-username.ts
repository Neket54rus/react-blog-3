import { createAsyncThunk } from '@reduxjs/toolkit'

import { USER_LOCAL_STORAGE_KEY, userActions, type User } from 'entities/user'

import i18n from 'shared/config/i18n/i18n'
import type { ThunkConfig } from 'shared/lib/store/state-schema'

interface LoginByUsernameOptions {
    username: string
    password: string
}

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameOptions,
    ThunkConfig<string>
>('login/loginByUsername', async (options, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi

    try {
        const { data } = await extra.api.post<User>('/login', options)

        if (!data) {
            throw new Error()
        }

        localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(data))
        dispatch(userActions.setAuthData(data))

        return data
    } catch {
        return rejectWithValue(i18n.t('Вы ввели неверный логин или пароль!'))
    }
})
