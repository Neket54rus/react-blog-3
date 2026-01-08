const ArticleType = {
    IT: 'IT',
    JAVA_SCRIPT: 'JavaScript',
    PROGRAMMING: 'Программирование',
} as const

export type ArticleType = (typeof ArticleType)[keyof typeof ArticleType]

export const ArticleBlockType = {
    CODE: 'CODE',
    IMAGE: 'IMAGE',
    TEXT: 'TEXT',
} as const

export type ArticleBlockType =
    (typeof ArticleBlockType)[keyof typeof ArticleBlockType]

export const ArticleView = {
    BIG: 'big',
    SMALL: 'small',
} as const

export type ArticleView = (typeof ArticleView)[keyof typeof ArticleView]
