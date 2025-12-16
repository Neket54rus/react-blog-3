import axios from 'axios'

import { userActions } from 'entities/user'

import { TestAsyncThunk } from 'shared/lib/test/test-async-thunk/test-async-thunk'

import { loginByUsername } from './login-by-username'

jest.mock('axios')
jest.mock('../../../../../shared/config/i18n/i18n-for-test')

const mockedAxios = axios as jest.Mocked<typeof axios>

describe('loginByUsername', () => {
    test('fulfilled', async () => {
        const userValue = { username: 'admin', id: '1' }

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }))

        const thunk = new TestAsyncThunk(loginByUsername)
        const result = await thunk.callThunk({
            username: 'admin',
            password: 'admin',
        })

        expect(thunk.dispatch).toHaveBeenCalledWith(
            userActions.setAuthData(userValue),
        )
        expect(thunk.dispatch).toHaveBeenCalledTimes(3)
        expect(mockedAxios.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(userValue)
    })

    test('403', async () => {
        mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }))

        const thunk = new TestAsyncThunk(loginByUsername)
        const result = await thunk.callThunk({
            username: 'admin',
            password: 'admin',
        })

        expect(mockedAxios.post).toHaveBeenCalled()
        expect(thunk.dispatch).toHaveBeenCalledTimes(2)
        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toBe('Вы ввели неверный логин или пароль!')
    })
})
