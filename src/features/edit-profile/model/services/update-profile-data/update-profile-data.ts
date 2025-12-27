import { createAsyncThunk } from '@reduxjs/toolkit'

import { profileAction, type Profile } from 'entities/profile'

import i18n from 'shared/config/i18n/i18n'
import { type ThunkConfig } from 'shared/lib/store/state-schema'

import { getEditProfileState } from '../../selectors/get-readonly/get-edit-profile-state'

export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<string>
>('profile/updateProfileData', async (_, thunkApi) => {
    const { extra, rejectWithValue, getState, dispatch } = thunkApi

    const { form } = getEditProfileState(getState())

    try {
        const { data } = await extra.api.put<Profile>('profile', form)

        if (!data) {
            throw new Error()
        }

        dispatch(profileAction.setProfile(data))

        return data
    } catch {
        return rejectWithValue(i18n.t('Произошла непредвиденная ошибка'))
    }
})
