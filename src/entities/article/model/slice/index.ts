import { combineReducers } from '@reduxjs/toolkit'

import { addCommentFormReducer } from 'features/add-comment-form'

import { commentsReducer } from 'entities/comment'

import type { ArticlePageSchema } from '../types'

import { articleReducer } from './article-slice'
import { articlesRecommendationReducer } from './articles-recommendation-slice'

export const articlePageReducer = combineReducers<ArticlePageSchema>({
    addCommentForm: addCommentFormReducer,
    article: articleReducer,
    articleComments: commentsReducer,
    articlesRecommendation: articlesRecommendationReducer,
})
