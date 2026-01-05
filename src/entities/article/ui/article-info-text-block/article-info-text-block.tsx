import { memo } from 'react'

import { classNames } from 'shared/lib/class-names'
import { SizeText, Text } from 'shared/ui/text'

import { type ArticleBlockText } from '../../model/types/article.types'

import classes from './article-info-text-block.module.scss'

interface ArticleInfoTextBlockProps {
    block: ArticleBlockText
    className?: string
}

export const ArticleInfoTextBlock = memo((props: ArticleInfoTextBlockProps) => {
    const { block, className } = props

    return (
        <div
            className={classNames(classes.articleInfoTextBlock, {}, [
                className,
            ])}
        >
            <Text size={SizeText.L}>{block.title}</Text>
            {block.paragraphs.map(({ id, text }) => (
                <Text key={id} className={classes.articleInfoTextBlockText}>
                    {text}
                </Text>
            ))}
        </div>
    )
})
