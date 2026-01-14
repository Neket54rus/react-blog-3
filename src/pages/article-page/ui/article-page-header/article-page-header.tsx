import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { getArticleState } from 'entities/article'
import { getUserAuthData } from 'entities/user'

import { classNames } from 'shared/lib/class-names'
import { RoutePath } from 'shared/routes'
import { Button, ButtonTheme } from 'shared/ui/button'

import classes from './article-page-header.module.scss'

interface ArticlePageHeaderProps {
    className?: string
}

export const ArticlePageHeader = memo((props: ArticlePageHeaderProps) => {
    const { className } = props

    const navigate = useNavigate()

    const userData = useSelector(getUserAuthData)
    const { data: articleData } = useSelector(getArticleState)

    const canEdit = userData?.username === articleData?.authorUsername

    const onEditArticle = useCallback(() => {
        navigate(`${RoutePath.article_edit}${articleData?.id}/edit`)
    }, [articleData?.id, navigate])

    return (
        <div className={classNames(classes.articlePageHeader, {}, [className])}>
            {canEdit && (
                <Button
                    className={classes.articlePageHeaderEditButton}
                    theme={ButtonTheme.OUTLINE}
                    onClick={onEditArticle}
                >
                    Редактировать
                </Button>
            )}
        </div>
    )
})
