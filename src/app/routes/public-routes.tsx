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

import { RoutePath } from 'shared/routes'

export const publicRoutes: RouteObject[] = [
    {
        element: <PageLayout />,
        children: [
            // public routes
            {
                path: RoutePath.main,
                index: true,
                element: <MainPage />,
            },
            {
                path: RoutePath.about,
                element: <AboutPage />,
            },
            // private routes
            {
                path: `${RoutePath.profile}:id`,
                element: (
                    <RequireAuth>
                        <ProfilePage />
                    </RequireAuth>
                ),
            },
            {
                path: RoutePath.articles,
                element: (
                    <RequireAuth>
                        <ArticlesPage />
                    </RequireAuth>
                ),
            },
            {
                path: `${RoutePath.article_detail}:id`,
                element: (
                    <RequireAuth>
                        <ArticlePage />
                    </RequireAuth>
                ),
            },
            {
                path: `${RoutePath.article_create}`,
                element: (
                    <RequireAuth>
                        <ArticleCreatePage />
                    </RequireAuth>
                ),
            },
            {
                path: `${RoutePath.article_edit}:id/edit`,
                element: (
                    <RequireAuth>
                        <ArticleCreatePage />
                    </RequireAuth>
                ),
            },
            // admin routes
            {
                path: RoutePath.admin_panel,
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
                path: RoutePath.not_found,
                element: <NotFoundPage />,
            },
        ],
    },
]
