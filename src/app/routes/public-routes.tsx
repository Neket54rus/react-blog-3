import { type RouteObject } from 'react-router'

import { RequireAdmin } from 'app/providers/router/ui/require-admin'
import { RequireAuth } from 'app/providers/router/ui/require-auth'

import { AboutPage } from 'pages/AboutPage'
import { AdminPanelPage } from 'pages/admin-panel-page'
import { ArticleCreatePage } from 'pages/article-create-page'
import { ArticlePage } from 'pages/article-page'
import { ArticlesPage } from 'pages/articles-page'
import { MainPage } from 'pages/MainPage'
import { NotFoundPage } from 'pages/not-found-page'
import { ProfilePage } from 'pages/profile-page'

import { PageLayout } from 'widgets/layout'

import {
    getRouteAbout,
    getRouteAdminPanel,
    getRouteArticleCreate,
    getRouteArticleDetail,
    getRouteArticleEdit,
    getRouteArticles,
    getRouteMain,
    getRouteNotFound,
    getRouteProfile,
} from 'shared/routes/constants'

export const publicRoutes: RouteObject[] = [
    {
        element: <PageLayout />,
        children: [
            // public routes
            {
                path: getRouteMain(),
                index: true,
                element: <MainPage />,
            },
            {
                path: getRouteAbout(),
                element: <AboutPage />,
            },
            // private routes
            {
                path: getRouteProfile(':id'),
                element: (
                    <RequireAuth>
                        <ProfilePage />
                    </RequireAuth>
                ),
            },
            {
                path: getRouteArticles(),
                element: (
                    <RequireAuth>
                        <ArticlesPage />
                    </RequireAuth>
                ),
            },
            {
                path: getRouteArticleDetail(':id'),
                element: (
                    <RequireAuth>
                        <ArticlePage />
                    </RequireAuth>
                ),
            },
            {
                path: getRouteArticleCreate(),
                element: (
                    <RequireAuth>
                        <ArticleCreatePage />
                    </RequireAuth>
                ),
            },
            {
                path: getRouteArticleEdit(':id'),
                element: (
                    <RequireAuth>
                        <ArticleCreatePage />
                    </RequireAuth>
                ),
            },
            // admin routes
            {
                path: getRouteAdminPanel(),
                element: (
                    <RequireAuth>
                        <RequireAdmin>
                            <AdminPanelPage />
                        </RequireAdmin>
                    </RequireAuth>
                ),
            },
            // 404
            {
                path: getRouteNotFound(),
                element: <NotFoundPage />,
            },
        ],
    },
]
