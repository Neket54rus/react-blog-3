import { memo } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

import {
    ArticleInfo,
    articleReducer,
    fetchArticleById,
    getArticleState,
} from 'entities/article'
import {
    commentsReducer,
    CommnetsList,
    fetchCommentsByArticleId,
    getCommentsState,
} from 'entities/comment'

import {
    DynamicModuleLoader,
    type ReducersList,
} from 'shared/lib/components/dynamic-module-loader/dynamic-module-loader'
import { useInitialEffect } from 'shared/lib/hooks/use-initial-effect/use-initial-effect'
import { useAppDispatch } from 'shared/lib/store/use-app-dispatch'
import { SizeText, Text } from 'shared/ui/text'

import classes from './article-page.module.scss'

const reducers: ReducersList = {
    article: articleReducer,
    articleComments: commentsReducer,
}

const ArticlePage = memo(() => {
    const dispatch = useAppDispatch()

    const { id } = useParams<{ id: string }>()

    const {
        data: article,
        isLoading: isLoadingArticle,
        error: errorArticle,
    } = useSelector(getArticleState)
    const {
        data: comments,
        isLoading: isLoadingComments,
        error: errorComments,
    } = useSelector(getCommentsState)

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchArticleById(id))
            dispatch(fetchCommentsByArticleId(id))
        }
    })

    if (!id) {
        return <div>Статья не найдена</div>
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <ArticleInfo
                article={article}
                loading={isLoadingArticle}
                error={errorArticle}
            />
            <Text
                className={classes.articlePageCommentsListTitle}
                size={SizeText.L}
            >
                Комментарии:
            </Text>
            <CommnetsList
                comments={comments}
                isLoading={isLoadingComments}
                error={errorComments}
            />
        </DynamicModuleLoader>
    )
})

export default ArticlePage
