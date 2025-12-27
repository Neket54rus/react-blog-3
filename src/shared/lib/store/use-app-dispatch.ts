import type { Action, ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { type AppDispatch } from 'app/providers/store'

import type { StateSchema, ThunkExtraArg } from 'shared/lib/store/state-schema'

export const useAppDispatch = (): ThunkDispatch<
    StateSchema,
    ThunkExtraArg,
    Action
> => useDispatch<AppDispatch>()
