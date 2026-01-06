import type { StateSchema } from 'shared/lib/store/state-schema'

import { initialState } from '../slice/add-comment-form-slice'
import type { AddCommentFormSchema } from '../types/add-comment-form'

export const getCommentFormState = (state: StateSchema): AddCommentFormSchema =>
    state.addCommentForm || initialState
