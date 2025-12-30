import { type StateSchema } from 'shared/lib/store/state-schema'

export const getUserInited = (state: StateSchema): boolean => state.user._inited
