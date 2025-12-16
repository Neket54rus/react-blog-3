import type { Reducer } from '@reduxjs/toolkit'
import { useEffect, type JSX, type ReactNode } from 'react'
import { useStore } from 'react-redux'

import type {
    ReduxStoreWithManager,
    StateSchemaKey,
} from 'shared/lib/store/state-schema'
import { useAppDispatch } from 'shared/lib/store/use-app-dispatch'

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer
}

interface DynamicModuleLoaderProps {
    children: ReactNode
    reducers: ReducersList
    removeAfterUnmount?: boolean
}

export const DynamicModuleLoader = (
    props: DynamicModuleLoaderProps,
): JSX.Element => {
    const { children, reducers, removeAfterUnmount } = props

    const dispatch = useAppDispatch()
    const store = useStore() as ReduxStoreWithManager

    useEffect(() => {
        Object.entries(reducers).forEach(([name, reducer]) => {
            store.reducerManager.add(name as StateSchemaKey, reducer)
            dispatch({ type: `@INIT ${name} reducer` })
        })

        return (): void => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name]) => {
                    store.reducerManager.remove(name as StateSchemaKey)
                    dispatch({ type: `DESTROY ${name} reducer` })
                })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <>{children}</>
}
