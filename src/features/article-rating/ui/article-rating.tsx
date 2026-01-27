import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { RatingCard } from 'entities/rating'
import { getUserAuthData } from 'entities/user'

import {
    useGetArticleRatingQuery,
    useRateArticleMutation,
} from '../model/api/rating-api'

export interface ArticleRatingProps {
    className?: string
    articleId: string
}

const ArticleRating = memo((props: ArticleRatingProps) => {
    const { className, articleId } = props

    const authData = useSelector(getUserAuthData)
    const { data, isLoading } = useGetArticleRatingQuery({
        articleId,
        userId: authData?.username || '',
    })
    const [rateArticleMutation] = useRateArticleMutation()

    const handleRateArticle = useCallback(
        (starsCount: number, feedback?: string) => {
            try {
                rateArticleMutation({
                    articleId,
                    userId: authData?.username || '',
                    rate: starsCount,
                    feedback,
                })
            } catch (error) {
                console.log(error)
            }
        },
        [articleId, authData?.username, rateArticleMutation],
    )

    const onAccept = useCallback(
        (starsCount: number, feedback?: string) => {
            handleRateArticle(starsCount, feedback)
        },
        [handleRateArticle],
    )

    const onCancel = useCallback(
        (starsCount: number) => {
            handleRateArticle(starsCount)
        },
        [handleRateArticle],
    )

    if (isLoading) {
        return 'Loading...'
    }

    const rating = data?.[0]

    return (
        <RatingCard
            rate={rating?.rate}
            className={className}
            title="Оценить статью"
            feedbackTitle="Оставьте свой отзыв о статье, это поможет улучшить качество"
            hasFeedback
            onAccept={onAccept}
            onCancel={onCancel}
        />
    )
})

export default ArticleRating
