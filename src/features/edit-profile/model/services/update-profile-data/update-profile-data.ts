import { createAsyncThunk } from '@reduxjs/toolkit'

import { profileAction, type Profile } from 'entities/profile'

import { type ThunkConfig } from 'shared/lib/store/state-schema'

import { ValidatePorfileError } from '../../config/profile.constants'
import { validateProfileData } from '../../lib/validate-profile-data/validate-profile-data'
import { getEditProfileState } from '../../selectors/get-readonly/get-edit-profile-state'

export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<ValidatePorfileError[]>
>('profile/updateProfileData', async (_, thunkApi) => {
    const { extra, rejectWithValue, getState, dispatch } = thunkApi

    const { form } = getEditProfileState(getState())

    const errors = validateProfileData(form)

    if (errors.length) {
        return rejectWithValue(errors)
    }

    try {
        const { data } = await extra.api.put<Profile>('profile', form)

        if (!data) {
            throw new Error()
        }

        dispatch(profileAction.setProfile(data))

        return data
    } catch {
        return rejectWithValue([ValidatePorfileError.SERVER_ERROR])
    }
})
