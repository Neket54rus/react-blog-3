import { type HTMLAttributeAnchorTarget, memo } from 'react'

import { classNames } from 'shared/lib/class-names'

import { ArticleView } from '../../../../model/constants/article.constants'
import type { Article } from '../../../../model/types/article.types'

import { ArticleListItemBig } from './article-list-item-big/article-list-item-big'
import { ArticleListItemSmall } from './article-list-item-small/article-list-item-small'
import classes from './article-list-item.module.scss'

interface ArticleListItemProps {
    article?: Article
    view?: ArticleView
    className?: string
    target?: HTMLAttributeAnchorTarget
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const { article, view = ArticleView.SMALL, className, target } = props

    if (!article) {
        return
    }

    if (view === ArticleView.BIG) {
        return (
            <div
                className={classNames(classes.articleListItem, {}, [
                    className,
                    classes[view],
                ])}
            >
                <ArticleListItemBig article={article} target={target} />
            </div>
        )
    }

    return (
        <div
            className={classNames(classes.articleListItem, {}, [
                className,
                classes[view],
            ])}
        >
            <ArticleListItemSmall article={article} target={target} />
        </div>
    )
})
