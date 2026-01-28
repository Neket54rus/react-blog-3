import { type PayloadAction } from '@reduxjs/toolkit'

import { buildSlice } from 'shared/lib/store'

import { USER_LOCAL_STORAGE_KEY } from '../constants/user.constants'
import type { User, UserSchema } from '../types/user'

const initialState: UserSchema = {
    _inited: false,
}

export const userSlice = buildSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload
        },
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY)

            if (user) {
                state.authData = JSON.parse(user)
                state._inited = true
            }
        },
        logout: (state) => {
            state.authData = undefined
            localStorage.removeItem(USER_LOCAL_STORAGE_KEY)
        },
    },
})

export const {
    actions: userActions,
    reducer: userReducer,
    useActions: useUserActions,
} = userSlice
