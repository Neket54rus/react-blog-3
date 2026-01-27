import { lazy, Suspense } from 'react'

import { type ArticleRatingProps } from './article-rating'

const ArticleRatingLazy = lazy(() => import('./article-rating'))

export const ArticleRatingAsync = (props: ArticleRatingProps) => (
    <Suspense fallback="loading...">
        <ArticleRatingLazy {...props} />
    </Suspense>
)
