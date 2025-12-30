import { type RouteObject } from 'react-router'

import { RequireAuth } from 'app/providers/router/ui/require-auth'

import { AboutPage } from 'pages/AboutPage'
import { MainPage } from 'pages/MainPage'
import { NotFoundPage } from 'pages/not-found-page'
import { ProfilePage } from 'pages/profile-page'

import { PageLayout } from 'widgets/layout'

import { AppRoutes, RoutePath } from 'shared/routes'

export const publicRoutes: RouteObject[] = [
    {
        element: <PageLayout />,
        children: [
            {
                path: RoutePath[AppRoutes.MAIN],
                index: true,
                element: <MainPage />,
            },
            {
                path: RoutePath[AppRoutes.ABOUT],
                element: <AboutPage />,
            },
            {
                path: RoutePath.profile,
                element: (
                    <RequireAuth>
                        <ProfilePage />
                    </RequireAuth>
                ),
            },
            {
                path: RoutePath[AppRoutes.NOT_FOUND],
                element: <NotFoundPage />,
            },
        ],
    },
]
