import { type User } from 'entities/user'

export interface Comment {
    id: string
    text: string
    articleId: string
    user: User
}

export interface CommentsSchema {
    data?: Comment[]
    isLoading: boolean
    error?: string
}
