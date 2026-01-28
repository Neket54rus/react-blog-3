import { buildSelector } from 'shared/lib/store'

export const [useUserAuthData, getUserAuthDataSelector] = buildSelector(
    (state) => state.user.authData,
)
