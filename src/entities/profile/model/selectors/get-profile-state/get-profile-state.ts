import { type StateSchema } from 'shared/lib/store/state-schema'

import { initialState } from '../../slice/profile-slice'
import type { ProfileSchema } from '../../types/profile'

export const getProfileState = (state: StateSchema): ProfileSchema =>
    state.profile || initialState
