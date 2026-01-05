import { memo } from 'react'

import { classNames } from 'shared/lib/class-names'
import { Code } from 'shared/ui/code'

import { type ArticleBlockCode } from '../../model/types/article.types'

import classes from './article-info-code-block.module.scss'

interface ArticleInfoCodeBlockProps {
    block: ArticleBlockCode
    className?: string
}

export const ArticleInfoCodeBlock = memo((props: ArticleInfoCodeBlockProps) => {
    const { block, className } = props

    return (
        <div
            className={classNames(classes.articleInfoCodeBlock, {}, [
                className,
            ])}
        >
            <Code text={block.code} />
        </div>
    )
})
