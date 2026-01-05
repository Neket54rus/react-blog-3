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
