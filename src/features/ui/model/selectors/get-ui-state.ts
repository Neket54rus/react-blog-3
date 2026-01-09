import { createSelector } from '@reduxjs/toolkit'

import { type StateSchema } from 'shared/lib/store/state-schema'

import type { UISchema } from '../types/ui.types'

const getUIState = (state: StateSchema): UISchema => state.UI

export const getUIScrollByPath = createSelector(
    getUIState,
    (_state: StateSchema, path: string) => path,
    (UIState, path) => UIState.scroll[path] || 0,
)
