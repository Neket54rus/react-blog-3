import type { Article } from './article.types'

export interface ArticlesRecommendationSchema {
    data?: Article[]
    isLoading?: boolean
    error?: string
}
