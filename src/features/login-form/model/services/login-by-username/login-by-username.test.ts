import { userActions } from 'entities/user'

import { TestAsyncThunk } from 'shared/lib/test/test-async-thunk/test-async-thunk'

import { loginByUsername } from './login-by-username'

jest.mock('../../../../../shared/config/i18n/i18n-for-test')

describe('loginByUsername', () => {
    test('fulfilled', async () => {
        const userValue = { username: 'admin', id: '1' }

        const thunk = new TestAsyncThunk(loginByUsername)
        thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }))
        const result = await thunk.callThunk({
            username: 'admin',
            password: 'admin',
        })

        expect(thunk.dispatch).toHaveBeenCalledWith(
            userActions.setAuthData(userValue),
        )
        expect(thunk.dispatch).toHaveBeenCalledTimes(3)
        expect(thunk.api.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(userValue)
    })

    test('403', async () => {
        const thunk = new TestAsyncThunk(loginByUsername)
        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }))
        const result = await thunk.callThunk({
            username: 'admin',
            password: 'admin',
        })

        expect(thunk.api.post).toHaveBeenCalled()
        expect(thunk.dispatch).toHaveBeenCalledTimes(2)
        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toBe('Вы ввели неверный логин или пароль!')
    })
})
