import type { LoginSchema } from 'features/login-form'

import type { UserSchema } from 'entities/user'

export interface StateSchema {
    user: UserSchema
    loginForm: LoginSchema
}
