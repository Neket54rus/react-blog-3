import type { StateSchema } from 'shared/lib/store/state-schema'

import type { LoginSchema } from '../types/login-schema'

const defaultState: LoginSchema = {
    username: '',
    password: '',
    isLoading: false,
    error: undefined,
}

export const getLoginState = (state: StateSchema): LoginSchema =>
    state.loginForm || defaultState
