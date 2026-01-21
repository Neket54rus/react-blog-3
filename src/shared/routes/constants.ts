export const AppRoutes = {
    MAIN: 'main',
    ABOUT: 'about',
    PROFILE: 'profile',
    ARTICLES: 'articles',
    ARTICLE_DETAIL: 'article_detail',
    ARTICLE_CREATE: 'article_create',
    ARTICLE_EDIT: 'article_edit',
    ADMIN_PANEL: 'admin_panel',
    //last
    NOT_FOUND: 'not_found',
} as const

export type AppRoutes = (typeof AppRoutes)[keyof typeof AppRoutes]

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile/', // + :id
    [AppRoutes.ARTICLES]: '/articles',
    [AppRoutes.ARTICLE_DETAIL]: '/articles/', // + :id
    [AppRoutes.ARTICLE_CREATE]: '/articles/create',
    [AppRoutes.ARTICLE_EDIT]: '/articles/', // + :id/edit
    [AppRoutes.ADMIN_PANEL]: '/admin',
    [AppRoutes.NOT_FOUND]: '*',
} as const
