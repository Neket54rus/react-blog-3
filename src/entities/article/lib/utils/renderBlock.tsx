import { type JSX } from 'react'

import { ArticleBlockType } from '../../model/constants/article.constants'
import { type ArticleBlock } from '../../model/types/article.types'
import { ArticleInfoCodeBlock } from '../../ui/article-info-code-block'
import { ArticleInfoImageBlock } from '../../ui/article-info-image-block'
import { ArticleInfoTextBlock } from '../../ui/article-info-text-block'

export const renderBlock = (block: ArticleBlock): JSX.Element | null => {
    switch (block.type) {
        case ArticleBlockType.CODE:
            return <ArticleInfoCodeBlock key={block.id} block={block} />
        case ArticleBlockType.IMAGE:
            return <ArticleInfoImageBlock key={block.id} block={block} />
        case ArticleBlockType.TEXT:
            return <ArticleInfoTextBlock key={block.id} block={block} />
        default:
            return null
    }
}
