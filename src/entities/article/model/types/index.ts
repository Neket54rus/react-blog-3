import { type Reducer } from '@reduxjs/toolkit'

import { type AddCommentFormSchema } from 'features/add-comment-form'

import { type CommentsSchema } from 'entities/comment'

import type { ArticleSchema } from './article.types'
import type { ArticlesRecommendationSchema } from './articles-recommendation.types'

export interface ArticlePageSchema {
    article: Reducer<ArticleSchema>
    articleComments: Reducer<CommentsSchema>
    addCommentForm: Reducer<AddCommentFormSchema>
    articlesRecommendation: Reducer<ArticlesRecommendationSchema>
}
