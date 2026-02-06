import { createSelector } from '@reduxjs/toolkit'

import { getUserAuthDataSelector } from 'entities/user'

import AboutIcon from 'shared/assets/icons/about.svg?react'
import ArticlesIcon from 'shared/assets/icons/articles.svg?react'
import AboutIconDeprecated from 'shared/assets/icons/deprecated/about.svg?react'
import ArticlesIconDeprecated from 'shared/assets/icons/deprecated/articles.svg?react'
import HomeIconDeprecated from 'shared/assets/icons/deprecated/home.svg?react'
import ProfileIconDeprecated from 'shared/assets/icons/deprecated/profile.svg?react'
import HomeIcon from 'shared/assets/icons/home.svg?react'
import ProfileIcon from 'shared/assets/icons/profile.svg?react'
import { togglefeatures } from 'shared/lib/features'
import {
    getRouteAbout,
    getRouteArticles,
    getRouteMain,
    getRouteProfile,
} from 'shared/routes/constants'

import type { MainNavigationItem } from '../types/main-navigation.types'

export const getMainNavigationItems = createSelector(
    getUserAuthDataSelector,
    (userData): MainNavigationItem[] =>
        togglefeatures({
            name: 'isAppRedesigned',
            on: () => [
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
            off: () => [
                {
                    to: getRouteMain(),
                    text: 'Главная',
                    Icon: HomeIconDeprecated,
                },
                {
                    to: getRouteAbout(),
                    text: 'О нас',
                    Icon: AboutIconDeprecated,
                },
                ...(userData?.username
                    ? [
                          {
                              to: getRouteProfile(userData.username),
                              text: 'Профиль',
                              Icon: ProfileIconDeprecated,
                              authOnly: true,
                          },
                      ]
                    : []),
                {
                    to: getRouteArticles(),
                    text: 'Статьи',
                    Icon: ArticlesIconDeprecated,
                    authOnly: true,
                },
            ],
        }),
)
