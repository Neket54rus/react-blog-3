import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { UISchema } from '../types/ui.types'

const initialState: UISchema = {
    scroll: {},
}

export const UISlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setScrollPosition: (
            state,
            action: PayloadAction<{ path: string; position: number }>,
        ) => {
            state.scroll[action.payload.path] = action.payload.position
        },
    },
})

export const { actions: UIActions, reducer: UIReducer } = UISlice
