import { createSelector } from '@reduxjs/toolkit'

import { UserRole } from '../constants/user.constants'

import { getUserAuthDataSelector } from './get-user-auth-data'

export const isUserAdmin = createSelector(
    getUserAuthDataSelector,
    (authData) => authData?.role === UserRole.ADMIN,
)
