import { createSelector } from '@reduxjs/toolkit'

import { UserRole } from '../constants/user.constants'

import { getUserAuthData } from './get-user-auth-data'

export const isUserAdmin = createSelector(
    getUserAuthData,
    (authData) => authData?.role === UserRole.ADMIN,
)
