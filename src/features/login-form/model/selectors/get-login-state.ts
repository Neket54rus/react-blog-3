import type { StateSchema } from 'shared/lib/store/state-schema'

import type { LoginSchema } from '../types/login-schema'

export const getLoginState = (state: StateSchema): LoginSchema =>
    state.loginForm
