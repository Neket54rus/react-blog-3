import { memo } from 'react'
import { Link } from 'react-router'

import ViewIcon from 'shared/assets/icons/view.svg?react'
import { classNames } from 'shared/lib/class-names'
import { RoutePath } from 'shared/routes'
import { Icon } from 'shared/ui/icon'
import { Text } from 'shared/ui/text'

import type { Article } from '../../../../../model/types/article.types'

import classes from './article-list-item-small.module.scss'
import { Card } from 'shared/ui/card'

interface ArticleListItemSmallProps {
    article?: Article
    className?: string
}

export const ArticleListItemSmall = memo((props: ArticleListItemSmallProps) => {
    const { article, className } = props

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
            // title={title}
            image={img}
            types={type}
            hover
        />
    )
})
