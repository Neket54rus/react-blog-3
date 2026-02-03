import { type PayloadAction } from '@reduxjs/toolkit'

import { buildSlice } from 'shared/lib/store'
import { setFeatureFlags } from 'shared/lib/features'

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
            setFeatureFlags(action.payload.features)
        },
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY)

            if (user) {
                const json = JSON.parse(user) as User
                state.authData = json
                setFeatureFlags(json.features)
            }

            state._inited = true
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
