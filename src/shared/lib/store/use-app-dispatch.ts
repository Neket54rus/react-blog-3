import { useDispatch } from 'react-redux'

import { type AppDispatch } from 'app/providers/store'

export const useAppDispatch = (): ReturnType<typeof useDispatch<AppDispatch>> =>
    useDispatch<AppDispatch>()
