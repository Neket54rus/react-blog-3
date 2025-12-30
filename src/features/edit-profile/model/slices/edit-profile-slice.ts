import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { type Profile } from 'entities/profile'

import { updateProfileData } from '../services/update-profile-data/update-profile-data'
import { type EditProfileSchema } from '../types/edit-profile'

export const initialState: EditProfileSchema = {
    readonly: true,
    isLoading: false,
}

export const edtiProfileSlice = createSlice({
    name: 'edit-profile',
    initialState,
    reducers: {
        setReadonly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload
        },
        setForm: (state, action: PayloadAction<Profile>) => {
            state.form = action.payload
        },
        updateForm: (state, action: PayloadAction<Partial<Profile>>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            }
        },
        resetForm: (state) => {
            state.form = undefined
            state.validateError = undefined
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateProfileData.pending, (state) => {
            state.isLoading = true
            state.validateError = undefined
        })
        builder.addCase(updateProfileData.fulfilled, (state) => {
            state.isLoading = false
            state.readonly = true
            state.validateError = undefined
        })
        builder.addCase(updateProfileData.rejected, (state, action) => {
            state.isLoading = false
            state.validateError = action.payload
        })
    },
})

export const { actions: editProfileAction, reducer: editProfileReducer } =
    edtiProfileSlice
