import { memo } from 'react'

import CalendarIcon from 'shared/assets/icons/calendar.svg?react'
import ViewsIcon from 'shared/assets/icons/views.svg?react'
import { classNames } from 'shared/lib/class-names'
import { Avatar } from 'shared/ui/avatar'
import { Icon } from 'shared/ui/icon'
import { ColorText, SizeText, Text } from 'shared/ui/text'

import { renderBlock } from '../../lib/utils/renderBlock'
import { type Article } from '../../model/types/article.types'
import { ArticleInfoSkeleton } from '../article-info-skeleton/article-info-skeleton'

import classes from './article-info.module.scss'

interface ArticleInfoProps {
    article?: Article
    loading?: boolean
    error?: string
    className?: string
}

export const ArticleInfo = memo((props: ArticleInfoProps) => {
    const { article, loading, error, className } = props

    if (loading) {
        return <ArticleInfoSkeleton />
    }

    if (error) {
        return (
            <div
                className={classNames(classes.articleInfo, {}, [
                    className,
                    classes.articleInfoError,
                ])}
            >
                <Text color={ColorText.ERROR} size={SizeText.L}>
                    {error}
                </Text>
            </div>
        )
    }

    if (!article) {
        return (
            <div
                className={classNames(classes.articleInfo, {}, [
                    className,
                    classes.articleInfoNoData,
                ])}
            >
                <Text color={ColorText.ERROR} size={SizeText.L}>
                    Статья не найдена
                </Text>
            </div>
        )
    }

    return (
        <div className={classNames(classes.articleInfo, {}, [className])}>
            <Avatar
                className={classes.articleInfoAvatar}
                size={200}
                src={article.img}
            />
            <Text size={SizeText.XL}>{article.title}</Text>
            <Text className={classes.articleInfoSubTitle} size={SizeText.L}>
                {article.subtitle}
            </Text>
            <div className={classes.articleInfoViews}>
                <Icon src={ViewsIcon} />
                <Text>{article.views.toString()}</Text>
            </div>
            <div className={classes.articleInfoCreateAt}>
                <Icon src={CalendarIcon} />
                <Text>{article.createdAt}</Text>
            </div>
            <div className={classes.articleInfoBlocks}>
                {article.blocks.map(renderBlock)}
            </div>
        </div>
    )
})
