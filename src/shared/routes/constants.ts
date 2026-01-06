export const AppRoutes = {
    MAIN: 'main',
    ABOUT: 'about',
    PROFILE: 'profile',
    ARTICLES: 'articles',
    ARTICLE_DETAIL: 'article_detail',
    NOT_FOUND: 'not_found',
} as const

export type AppRoutes = (typeof AppRoutes)[keyof typeof AppRoutes]

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile/', // + :id
    [AppRoutes.ARTICLES]: '/articles',
    [AppRoutes.ARTICLE_DETAIL]: '/articles/', // + :id
    [AppRoutes.NOT_FOUND]: '*',
} as const
