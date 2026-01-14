import { lazy } from 'react'

export const ArticleCreatePageAsync = lazy(
    () => import('./article-create-page'),
)
