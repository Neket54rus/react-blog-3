import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { loginByUsername } from '../services/login-by-username/login-by-username'
import type { LoginSchema } from '../types/login-schema'

const initialState: LoginSchema = {
    username: '',
    password: '',
    isLoading: false,
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
        setDefaultState: (state) => {
            state.username = ''
            state.password = ''
            state.error = undefined
            state.isLoading = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByUsername.pending, (state) => {
                state.isLoading = true
                state.error = undefined
            })
            .addCase(loginByUsername.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(loginByUsername.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { actions: loginActions, reducer: loginReducer } = loginSlice
