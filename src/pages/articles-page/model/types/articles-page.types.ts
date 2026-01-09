import { type Article, type ArticleView } from 'entities/article'

export interface ArticlesPageSchema {
    isLoading?: boolean
    error?: string
    articles?: Article[]
    view?: ArticleView
    page?: number
    limit?: number
    hasMore?: boolean
    _inited?: boolean
}
