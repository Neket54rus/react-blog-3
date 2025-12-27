import { createAsyncThunk } from '@reduxjs/toolkit'

import i18n from 'shared/config/i18n/i18n'
import { type ThunkConfig } from 'shared/lib/store/state-schema'

import { type Profile } from '../../types/profile'

export const fetchProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<string>
>('profile/fetchProfileData', async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi

    try {
        const { data } = await extra.api.get<Profile>('profile')

        if (!data) {
            throw new Error()
        }

        return data
    } catch {
        return rejectWithValue(i18n.t('Произошла непредвиденная ошибка'))
    }
})
