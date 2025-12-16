import { type LoginSchema } from '../types/login-schema'

import { loginActions, loginReducer } from './login-slice'

describe('loginSlice', () => {
    test('test set username', () => {
        const state: Partial<LoginSchema> = {}
        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setUsername('admin'),
            ),
        ).toEqual({ username: 'admin' })
    })

    test('test set passwornd', () => {
        const state: Partial<LoginSchema> = {}
        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setPassword('admin'),
            ),
        ).toEqual({ password: 'admin' })
    })

    test('test set default state', () => {
        const state: Partial<LoginSchema> = {}
        expect(
            loginReducer(state as LoginSchema, loginActions.setDefaultState()),
        ).toEqual({
            username: '',
            password: '',
            isLoading: false,
            error: undefined,
        })
    })
})
