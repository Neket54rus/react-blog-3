import { type RouteObject } from 'react-router'

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
                path: RoutePath[AppRoutes.PROFILE],
                element: <ProfilePage />,
            },
            {
                path: RoutePath[AppRoutes.NOT_FOUND],
                element: <NotFoundPage />,
            },
        ],
    },
]
