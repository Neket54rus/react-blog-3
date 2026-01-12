export const ArticlesSort = {
    VIEWS: 'views',
    TITLE: 'title',
    CREATE: 'createAt',
} as const

export type ArticlesSort = (typeof ArticlesSort)[keyof typeof ArticlesSort]
