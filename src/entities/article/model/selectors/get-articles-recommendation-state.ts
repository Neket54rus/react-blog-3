import { type StateSchema } from 'shared/lib/store/state-schema'

import { initialState } from '../slice/articles-recommendation-slice'
import type { ArticlesRecommendationSchema } from '../types/articles-recommendation.types'

export const getArticlesRecommendationState = (
    state: StateSchema,
): ArticlesRecommendationSchema =>
    state.articlePage?.articlesRecommendation || initialState
