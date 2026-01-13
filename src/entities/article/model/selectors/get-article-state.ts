import { type StateSchema } from 'shared/lib/store/state-schema'

import { initialState } from '../slice/article-slice'
import { type ArticleSchema } from '../types/article.types'

export const getArticleState = (state: StateSchema): ArticleSchema =>
    state.articlePage?.article || initialState
