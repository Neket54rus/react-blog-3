import { memo } from 'react'

import { ArticleList } from 'entities/article'

import { SizeText, Text } from 'shared/ui/text'

import { useGetArticleRecommendationListQuery } from '../api/article-recommendation-api'

interface ArticleRecommendationListProps {
    className?: string
}

export const ArticleRecommendationList = memo(
    (props: ArticleRecommendationListProps) => {
        const { className } = props

        const {
            data: articlesRecommendation,
            isLoading: isLoadingArticlesRecommendation,
        } = useGetArticleRecommendationListQuery(4)

        return (
            <div className={className}>
                <Text size={SizeText.L}>Рекомендуем:</Text>
                <ArticleList
                    articles={articlesRecommendation?.items}
                    loading={isLoadingArticlesRecommendation}
                    target="_blank"
                />
            </div>
        )
    },
)
