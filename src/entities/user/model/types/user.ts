import { type FeatureFlags } from 'shared/types/features-flags'
import { type UserRole } from '../constants/user.constants'

export interface User {
    id: string
    username: string
    avatar: string
    role: UserRole
    features?: FeatureFlags
}

export interface UserSchema {
    authData?: User
    _inited: boolean
}
