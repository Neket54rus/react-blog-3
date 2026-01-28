import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { getArticleState } from 'entities/article'
import { useUserAuthData } from 'entities/user'

import { classNames } from 'shared/lib/class-names'
import { getRouteArticleEdit } from 'shared/routes/constants'
import { Button, ButtonTheme } from 'shared/ui/button'

import classes from './article-page-header.module.scss'

interface ArticlePageHeaderProps {
    className?: string
}

export const ArticlePageHeader = memo((props: ArticlePageHeaderProps) => {
    const { className } = props

    const navigate = useNavigate()

    const userData = useUserAuthData()
    const { data: articleData } = useSelector(getArticleState)

    const canEdit = userData?.username === articleData?.authorUsername

    const onEditArticle = useCallback(() => {
        if (articleData) {
            navigate(getRouteArticleEdit(articleData.id))
        }
    }, [articleData, navigate])

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
