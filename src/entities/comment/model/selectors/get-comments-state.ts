import type { StateSchema } from 'shared/lib/store/state-schema'

import { initialState } from '../slice/comments'
import type { CommentsSchema } from '../types/comment.types'

export const getCommentsState = (state: StateSchema): CommentsSchema =>
    state.articlePage?.articleComments || initialState
