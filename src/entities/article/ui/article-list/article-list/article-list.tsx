import { memo } from 'react'

import { classNames } from 'shared/lib/class-names'
import { Spinner } from 'shared/ui/spinner'

import { ArticleView } from '../../../model/constants/article.constants'
import { type Article } from '../../../model/types/article.types'
import { ArticleListItem } from '../../article-list-item'

import classes from './article-list.module.scss'

interface ArticleListProps {
    articles?: Article[]
    loading?: boolean
    view?: ArticleView
    className?: string
}

export const ArticleList = memo((props: ArticleListProps) => {
    const { articles, view = ArticleView.SMALL, className } = props

    if (!articles || !articles.length) {
        return
    }

    return (
        <div
            className={classNames(classes.articleList, {}, [
                className,
                classes[view],
            ])}
        >
            {articles.map((article) => (
                <ArticleListItem
                    key={article.id}
                    article={article}
                    view={view}
                />
            ))}
        </div>
    )
})
