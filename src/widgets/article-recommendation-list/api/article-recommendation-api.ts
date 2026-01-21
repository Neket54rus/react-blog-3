import { type Article } from 'entities/article'

import { rtkApi } from 'shared/api/rtkApi'

interface FetchArticlesResult {
    items: Article[]
    pagination: {
        hasNextPage: boolean
        hasPrevPage: boolean
        limit: number
        page: number
        totalItems: number
        totalPages: number
    }
}

const articleRecommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationList: build.query<FetchArticlesResult, number>({
            query: (limit) => ({
                url: 'articles',
                params: {
                    limit,
                },
            }),
        }),
    }),
})

export const { useGetArticleRecommendationListQuery } =
    articleRecommendationsApi
