import { type StateSchema } from 'shared/lib/store/state-schema'

import { initialState } from '../../slices/edit-profile-slice'
import { type EditProfileSchema } from '../../types/edit-profile'

export const getEditProfileState = (state: StateSchema): EditProfileSchema =>
    state.editProfile || initialState
