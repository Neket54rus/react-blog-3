import {
    type ArticleType,
    type Article,
    type ArticleView,
} from 'entities/article'

import type { SortOrder } from 'shared/types/types'

import { type ArticlesSort } from '../constants/articles-page.constants'

export interface ArticlesPageSchema {
    isLoading?: boolean
    error?: string
    articles?: Article[]
    view?: ArticleView
    page?: number
    limit?: number
    hasMore?: boolean
    order?: SortOrder
    sort?: ArticlesSort
    search?: string
    type?: ArticleType
    _inited?: boolean
}
