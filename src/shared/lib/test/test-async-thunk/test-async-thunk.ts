/* eslint-disable @typescript-eslint/no-explicit-any */

import { type AsyncThunkAction } from '@reduxjs/toolkit'
import axios, { type AxiosStatic } from 'axios'

import { type StateSchema } from 'shared/lib/store/state-schema'

type ActionCreatorType<Return, Arg, RejectedValue> = (
    arg: Arg,
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

export class TestAsyncThunk<Return, Arg, RejectedValue> {
    dispatch: jest.MockedFn<any>
    getState: () => StateSchema
    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>
    api: jest.Mocked<AxiosStatic>
    navigate: jest.MockedFn<any>

    constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>) {
        this.actionCreator = actionCreator
        this.dispatch = jest.fn()
        this.getState = jest.fn()
        this.api = mockedAxios
        this.navigate = jest.fn()
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    async callThunk(arg: Arg) {
        const action = this.actionCreator(arg)
        const result = await action(this.dispatch, this.getState, {
            api: this.api,
            navigate: this.navigate,
        })

        return result
    }
}
