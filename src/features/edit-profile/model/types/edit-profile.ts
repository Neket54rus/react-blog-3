import { type Profile } from 'entities/profile'

export interface EditProfileSchema {
    readonly: boolean
    form?: Profile
    isLoading: boolean
    error?: string
}
