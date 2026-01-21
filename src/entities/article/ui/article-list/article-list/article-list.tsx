import { type HTMLAttributeAnchorTarget, type JSX, memo } from 'react'
import { List, type ListRowProps, WindowScroller } from 'react-virtualized'

import { classNames } from 'shared/lib/class-names'

import { ArticleView } from '../../../model/constants/article.constants'
import { type Article } from '../../../model/types/article.types'
import { ArticleListItem } from '../../article-list-item'

import classes from './article-list.module.scss'

interface ArticleListProps {
    articles?: Article[]
    loading?: boolean
    view?: ArticleView
    className?: string
    target?: HTMLAttributeAnchorTarget
    virtualized?: boolean
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        articles,
        view = ArticleView.SMALL,
        className,
        target,
        virtualized,
    } = props

    if (!articles || !articles.length) {
        return
    }

    const isBig = view === ArticleView.BIG

    const itemsPerRow = isBig ? 1 : 3
    const rowCount = isBig
        ? articles.length
        : Math.ceil(articles.length / itemsPerRow)

    const rowRender = (props: ListRowProps): JSX.Element => {
        const { index, key, style } = props

        const items = []
        const fromIndex = index * itemsPerRow
        const toIndex = Math.min(fromIndex + itemsPerRow, articles.length)

        for (let index = fromIndex; index < toIndex; index++) {
            items.push(
                <ArticleListItem
                    key={`str${index}`}
                    article={articles[index]}
                    view={view}
                    target={target}
                />,
            )
        }

        return (
            <div key={key} style={style}>
                {items}
            </div>
        )
    }

    if (virtualized) {
        return (
            <WindowScroller
                scrollElement={document.getElementById('PAGE_ID') as Element}
            >
                {({
                    width,
                    height,
                    registerChild,
                    scrollTop,
                    isScrolling,
                    onChildScroll,
                }) => (
                    <div
                        ref={registerChild}
                        className={classNames(classes.articleList, {}, [
                            className,
                            classes[view],
                        ])}
                    >
                        <List
                            rowHeight={isBig ? 550 : 360}
                            rowCount={rowCount}
                            rowRenderer={rowRender}
                            width={width ? width - 80 : 700}
                            height={height ?? 550}
                            autoHeight
                            onScroll={onChildScroll}
                            isScrolling={isScrolling}
                            scrollTop={scrollTop}
                        />
                    </div>
                )}
            </WindowScroller>
        )
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
                    target={target}
                />
            ))}
        </div>
    )
})
