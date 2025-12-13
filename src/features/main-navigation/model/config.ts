import AboutIcon from 'shared/assets/icons/about.svg?react'
import HomeIcon from 'shared/assets/icons/home.svg?react'
import { RoutePath } from 'shared/routes'

export const mainNavigationItems = [
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
]
