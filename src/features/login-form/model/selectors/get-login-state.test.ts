import { type StateSchema } from 'shared/lib/store/state-schema'

import { getLoginState } from './get-login-state'

describe('getLoginState', () => {
    test('return full state', () => {
        const state: Partial<StateSchema> = {
            loginForm: {
                isLoading: false,
                password: 'admin',
                username: 'admin',
                error: undefined,
            },
        }
        const { isLoading, password, username, error } = getLoginState(state)

        expect(isLoading).toEqual(false)
        expect(password).toEqual('admin')
        expect(username).toEqual('admin')
        expect(error).toEqual(undefined)
    })

    test('shoul work with empty state', () => {
        const { isLoading, password, username, error } = getLoginState({})

        expect(isLoading).toEqual(false)
        expect(password).toEqual('')
        expect(username).toEqual('')
        expect(error).toEqual(undefined)
    })
})
