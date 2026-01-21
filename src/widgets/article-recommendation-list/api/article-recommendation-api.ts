import { rtkApi } from 'shared/api/rtkApi'

const articleRecommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationList: build.query({
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
