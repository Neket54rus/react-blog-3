import { type Profile } from 'entities/profile'

import { type ValidatePorfileError } from '../config/profile.constants'

export interface EditProfileSchema {
    readonly: boolean
    form?: Profile
    isLoading: boolean
    error?: ValidatePorfileError[]
    validateError?: ValidatePorfileError[]
}
