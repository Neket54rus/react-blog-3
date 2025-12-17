import { createSlice } from '@reduxjs/toolkit'

import type { ProfileSchema } from '../types/profile'

const initialState: ProfileSchema = {
    isLoading: false,
    readonly: true,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
})

export const { actions: profileAction, reducer: profileReducer } = profileSlice
