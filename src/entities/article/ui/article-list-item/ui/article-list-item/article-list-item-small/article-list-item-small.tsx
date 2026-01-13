import { type HTMLAttributeAnchorTarget, memo } from 'react'

import { RoutePath } from 'shared/routes'
import { Card } from 'shared/ui/card'

import type { Article } from '../../../../../model/types/article.types'

interface ArticleListItemSmallProps {
    article?: Article
    className?: string
    target?: HTMLAttributeAnchorTarget
}

export const ArticleListItemSmall = memo((props: ArticleListItemSmallProps) => {
    const { article, className, target } = props

    if (!article) {
        return
    }

    const { createdAt, views, title, img, type } = article

    return (
        <Card
            className={className}
            to={`${RoutePath.article_detail}${article.id}`}
            createAt={createdAt}
            views={views.toString()}
            title={title}
            image={img}
            types={type}
            hover
            target={target}
        />
    )
})
