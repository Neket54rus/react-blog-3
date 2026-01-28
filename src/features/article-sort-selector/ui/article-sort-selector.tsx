import { memo } from 'react'

import { ArticlesSort } from 'pages/articles-page'

import { classNames } from 'shared/lib/class-names'
import type { SortOrder } from 'shared/types/types'
import { Select, type SelectOption } from 'shared/ui/select'

import classes from './article-sort-selector.module.scss'

interface ArticleSortSelectorProps {
    sort?: ArticlesSort
    order?: SortOrder
    className?: string
    onChangeOrder: (newOrder: SortOrder) => void
    onChangeSort: (newSort: ArticlesSort) => void
}

const orderOptions: SelectOption<SortOrder>[] = [
    {
        value: 'asc',
        content: 'возрастанию',
    },
    {
        value: 'desc',
        content: 'убыванию',
    },
]

const sortOptions: SelectOption<ArticlesSort>[] = [
    {
        value: ArticlesSort.CREATE,
        content: 'дате созданию',
    },
    {
        value: ArticlesSort.TITLE,
        content: 'загаловку',
    },
    {
        value: ArticlesSort.VIEWS,
        content: 'просмотрам',
    },
]

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const { sort, order, className, onChangeOrder, onChangeSort } = props

    return (
        <div
            className={classNames(classes.articleSortSelector, {}, [className])}
        >
            <Select<ArticlesSort>
                options={sortOptions}
                label="Сортировать ПО"
                value={sort}
                onChange={onChangeSort}
            />
            <Select<SortOrder>
                options={orderOptions}
                label="по"
                value={order}
                onChange={onChangeOrder}
            />
        </div>
    )
})
