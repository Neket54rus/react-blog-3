import type { FunctionComponent, SVGAttributes } from 'react'

import AboutIcon from 'shared/assets/icons/about.svg?react'
import ArticlesIcon from 'shared/assets/icons/articles.svg?react'
import HomeIcon from 'shared/assets/icons/home.svg?react'
import ProfileIcon from 'shared/assets/icons/profile.svg?react'
import { RoutePath } from 'shared/routes'

export interface MainNavigationItem {
    to: string
    text: string
    Icon: FunctionComponent<SVGAttributes<SVGElement>>
    authOnly?: boolean
}

export const mainNavigationItems = (
    username?: string,
): MainNavigationItem[] => [
    {
        to: RoutePath.main,
        text: 'Главная',
        Icon: HomeIcon,
    },
    {
        to: RoutePath.about,
        text: 'О нас',
        Icon: AboutIcon,
    },
    ...(username
        ? [
              {
                  to: `${RoutePath.profile}${username}`,
                  text: 'Профиль',
                  Icon: ProfileIcon,
                  authOnly: true,
              },
          ]
        : []),
    {
        to: RoutePath.articles,
        text: 'Статьи',
        Icon: ArticlesIcon,
        authOnly: true,
    },
]
