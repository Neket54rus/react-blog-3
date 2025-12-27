import { type JSX, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { setNavigate } from './config/store'

export const StoreUpdater = (): JSX.Element | null => {
    const navigate = useNavigate()

    useEffect(() => {
        setNavigate(navigate)
    }, [navigate])

    return null
}
