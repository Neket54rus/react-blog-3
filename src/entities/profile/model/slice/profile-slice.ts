import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { fetchProfileData } from '../services/fetch-profile-data/fetch-profile-data'
import type { Profile, ProfileSchema } from '../types/profile'

export const initialState: ProfileSchema = {
    isLoading: false,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        updateProfile: (state, action: PayloadAction<Profile>) => {
            state.data = { ...state.data, ...action.payload }
        },
        setProfile: (state, action: PayloadAction<Profile>) => {
            state.data = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProfileData.pending, (state) => {
            state.isLoading = true
            state.error = undefined
        })
        builder.addCase(fetchProfileData.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = undefined
            state.data = action.payload
        })
        builder.addCase(fetchProfileData.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    },
})

export const { actions: profileAction, reducer: profileReducer } = profileSlice
