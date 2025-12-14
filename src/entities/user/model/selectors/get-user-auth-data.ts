import type { StateSchema } from 'shared/lib/store/state-schema'

import type { User } from '../types/user'

export const getUserAuthData = (state: StateSchema): User | undefined =>
    state.user.authData
