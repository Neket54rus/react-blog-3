import { createAsyncThunk } from '@reduxjs/toolkit'

import { getArticleState } from 'entities/article'
import { fetchCommentsByArticleId, type Comment } from 'entities/comment'
import { getUserAuthData } from 'entities/user'

import { type ThunkConfig } from 'shared/lib/store/state-schema'

export const addCommentForArticle = createAsyncThunk<
    Comment,
    string,
    ThunkConfig<string>
>('article-page/add-comment-for-article', async (text, thunkApi) => {
    const { extra, rejectWithValue, getState, dispatch } = thunkApi

    const authData = getUserAuthData(getState())
    const { data: article } = getArticleState(getState())

    if (!authData || !text || !article) {
        return rejectWithValue('no data')
    }

    try {
        const { data } = await extra.api.post<Comment>('comments', {
            articleId: article.id,
            userId: authData.username,
            text,
        })

        if (!data) {
            throw new Error()
        }

        dispatch(fetchCommentsByArticleId(article.id))

        return data
    } catch {
        return rejectWithValue('error')
    }
})
