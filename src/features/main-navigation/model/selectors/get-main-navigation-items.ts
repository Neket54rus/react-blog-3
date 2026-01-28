import { createSelector } from '@reduxjs/toolkit'

import { getUserAuthDataSelector } from 'entities/user'

import AboutIcon from 'shared/assets/icons/about.svg?react'
import ArticlesIcon from 'shared/assets/icons/articles.svg?react'
import HomeIcon from 'shared/assets/icons/home.svg?react'
import ProfileIcon from 'shared/assets/icons/profile.svg?react'
import {
    getRouteAbout,
    getRouteArticles,
    getRouteMain,
    getRouteProfile,
} from 'shared/routes/constants'

import type { MainNavigationItem } from '../types/main-navigation.types'

export const getMainNavigationItems = createSelector(
    getUserAuthDataSelector,
    (userData): MainNavigationItem[] => [
        {
            to: getRouteMain(),
            text: 'Главная',
            Icon: HomeIcon,
        },
        {
            to: getRouteAbout(),
            text: 'О нас',
            Icon: AboutIcon,
        },
        ...(userData?.username
            ? [
                  {
                      to: getRouteProfile(userData.username),
                      text: 'Профиль',
                      Icon: ProfileIcon,
                      authOnly: true,
                  },
              ]
            : []),
        {
            to: getRouteArticles(),
            text: 'Статьи',
            Icon: ArticlesIcon,
            authOnly: true,
        },
    ],
)
