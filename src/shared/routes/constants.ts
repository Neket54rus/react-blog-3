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

export const getRouteMain = (): string => '/'
export const getRouteAbout = (): string => '/about'
export const getRouteProfile = (id: string): string => `/profile/${id}`
export const getRouteArticles = (): string => '/articles'
export const getRouteArticleDetail = (id: string): string => `/articles/${id}`
export const getRouteArticleCreate = (): string => '/articles/create'
export const getRouteArticleEdit = (id: string): string =>
    `/articles/${id}/edit`
export const getRouteAdminPanel = (): string => '/admin'
export const getRouteNotFound = (): string => '*'
