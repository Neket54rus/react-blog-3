import {
    bindActionCreators,
    type CaseReducerActions,
    createSlice,
    type CreateSliceOptions,
    type SliceCaseReducers,
} from '@reduxjs/toolkit'
import { useMemo } from 'react'

import { useAppDispatch } from './use-app-dispatch'

export const buildSlice = <
    State,
    CaseReducers extends SliceCaseReducers<State>,
    Name extends string,
>(
    options: CreateSliceOptions<State, CaseReducers, Name>,
) => {
    const slice = createSlice(options)

    const useActions = (): CaseReducerActions<CaseReducers, Name> => {
        const dispatch = useAppDispatch()

        return useMemo(
            () => bindActionCreators(slice.actions, dispatch),
            [dispatch],
        )
    }

    return {
        ...slice,
        useActions,
    }
}
