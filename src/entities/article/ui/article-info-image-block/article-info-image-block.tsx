import { memo } from 'react'

import { classNames } from 'shared/lib/class-names'
import { Text } from 'shared/ui/text'

import { type ArticleBlockImage } from '../../model/types/article.types'

import classes from './article-info-image-block.module.scss'

interface ArticleInfoImageBlockProps {
    block: ArticleBlockImage
    className?: string
}

export const ArticleInfoImageBlock = memo(
    (props: ArticleInfoImageBlockProps) => {
        const { block, className } = props

        return (
            <div
                className={classNames(classes.articleInfoImageBlock, {}, [
                    className,
                ])}
            >
                <img
                    className={classes.articleInfoImageBlockImage}
                    src={block.img}
                    alt={block.title}
                />
                <Text>{block.title}</Text>
            </div>
        )
    },
)
