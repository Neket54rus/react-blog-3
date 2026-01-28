import { type CSSProperties, type HTMLAttributeAnchorTarget, memo } from 'react'
import { Link } from 'react-router'

import ViewIcon from 'shared/assets/icons/view.svg?react'
import { classNames } from 'shared/lib/class-names'
import { getRouteArticleDetail } from 'shared/routes/constants'
import { Avatar } from 'shared/ui/avatar'
import { Button, ButtonTheme } from 'shared/ui/button'
import { SizeText, Text } from 'shared/ui/text'

import { ArticleBlockType } from '../../../../../model/constants/article.constants'
import type { Article } from '../../../../../model/types/article.types'

import classes from './article-list-item-big.module.scss'

interface ArticleListItemBigProps {
    article?: Article
    className?: string
    target?: HTMLAttributeAnchorTarget
}

export const ArticleListItemBig = memo((props: ArticleListItemBigProps) => {
    const { article, className, target } = props

    if (!article) {
        return
    }

    const backgroundImageStyles: CSSProperties = {
        backgroundImage: `url("${article.img}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '180px',
    }

    const textBlock =
        article.blocks
            .reduce(
                (acc, block) =>
                    block.type === ArticleBlockType.TEXT
                        ? acc +
                          block.paragraphs.reduce(
                              (pAcc, p) => pAcc + p.text + ' ',
                              '',
                          )
                        : acc,
                '',
            )
            .trim()
            .split(/\s+/)
            .slice(0, 100)
            .join(' ') + '...'

    return (
        <div
            className={classNames(classes.articleListItemBig, {}, [className])}
        >
            <div className={classes.articleListItemBigHeader}>
                <div className={classes.articleListItemBigHeaderHeader}>
                    <div
                        className={classes.articleListItemBigHeaderHeaderAuthor}
                    >
                        <Avatar src={article.author.avatar} size={35} />
                        <Text>
                            {article.author.username || 'Имя не установлено'}
                        </Text>
                    </div>
                    <Text>{article.createdAt}</Text>
                </div>
                <Text size={SizeText.L}>{article.title}</Text>
                <div className={classes.articleListItemBigHeaderTypes}>
                    {article.type.map((type) => (
                        <Text key={type}>{type}</Text>
                    ))}
                </div>
            </div>
            <div
                className={classes.articleListItemBigImage}
                style={backgroundImageStyles}
            />
            <Text className={classes.articleListItemBigText}>{textBlock}</Text>
            <div className={classes.articleListItemBigFooter}>
                <Button theme={ButtonTheme.OUTLINE}>
                    <Link
                        to={getRouteArticleDetail(article.id)}
                        target={target}
                    >
                        Читать далее...
                    </Link>
                </Button>
                <div className={classes.articleListItemBigFooterViews}>
                    <Text>{article.views.toString()}</Text>
                    <ViewIcon />
                </div>
            </div>
        </div>
    )
})
