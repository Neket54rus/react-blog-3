import { memo, useMemo, type JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { useUserAuthData } from 'entities/user'

import { classNames } from 'shared/lib/class-names'
import { togglefeatures } from 'shared/lib/features'
import { Icon as IconDeprecated, IconTheme } from 'shared/ui/deprecated/icon'
import { Link as LinkDeprecated, LinkTheme } from 'shared/ui/deprecated/link'
import { HStack, VStack } from 'shared/ui/deprecated/stack'
import { Icon } from 'shared/ui/redesigned/icon'
import { Link } from 'shared/ui/redesigned/link'

import { getMainNavigationItems } from '../model/selectors/get-main-navigation-items'

import classes from './main-navigation.module.scss'

interface MainNavigationProps {
    className?: string
    short?: boolean
}

export const MainNavigation = memo(
    (props: MainNavigationProps): JSX.Element => {
        const { className, short } = props

        const { t } = useTranslation()
        const authData = useUserAuthData()
        const mainNavigationItems = useSelector(getMainNavigationItems)

        const navigationItems = useMemo(
            () =>
                togglefeatures({
                    name: 'isAppRedesigned',
                    on: () =>
                        mainNavigationItems
                            .filter((item) => !item.authOnly || authData)
                            .map((item) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className={classNames(classes.link, {
                                        [classes.short]: short || false,
                                    })}
                                >
                                    <HStack gap={10} align="center">
                                        <Icon src={item.Icon} />
                                        {!short && t(item.text)}
                                    </HStack>
                                </Link>
                            )),
                    off: () =>
                        mainNavigationItems
                            .filter((item) => !item.authOnly || authData)
                            .map((item) => (
                                <LinkDeprecated
                                    key={item.to}
                                    to={item.to}
                                    theme={LinkTheme.SECONDARY}
                                >
                                    <HStack gap={10}>
                                        <IconDeprecated
                                            src={item.Icon}
                                            theme={IconTheme.INVERTED_SECONDARY}
                                        />
                                        {!short && t(item.text)}
                                    </HStack>
                                </LinkDeprecated>
                            )),
                }),
            [authData, mainNavigationItems, short, t],
        )

        return (
            <VStack
                className={className}
                gap={10}
                {...(short && { align: 'center' })}
            >
                {navigationItems}
            </VStack>
        )
    },
)
