import { type StateSchema } from 'shared/lib/store/state-schema'

import { initialState } from '../slice/articles-page-slice'
import type { ArticlesPageSchema } from '../types/articles-page.types'

export const getArticlesPageState = (state: StateSchema): ArticlesPageSchema =>
    state.articlesPage || initialState
