import {
    type ArticleType,
    type ArticleBlockType,
} from '../constants/article.constants'

interface ArticleBlockBase {
    id: string
    type: ArticleBlockType
}

export interface ArticleBlockCode extends ArticleBlockBase {
    type: 'CODE'
    code: string
    id: string
}

export interface ArticleBlockImage extends ArticleBlockBase {
    type: 'IMAGE'
    img: string
    title: string
}

interface ArticleText {
    id: string
    text: string
}

export interface ArticleBlockText extends ArticleBlockBase {
    type: 'TEXT'
    title: string
    paragraphs: ArticleText[]
}

export type ArticleBlock =
    | ArticleBlockCode
    | ArticleBlockImage
    | ArticleBlockText

export interface Article {
    id: string
    title: string
    subtitle: string
    text: string
    img: string
    views: number
    createdAt: string
    type: ArticleType[]
    blocks: ArticleBlock[]
}

export interface ArticleSchema {
    isLoading: boolean
    error?: string
    data?: Article
}
