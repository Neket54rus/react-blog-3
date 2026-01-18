import { memo, useMemo, type JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { getUserAuthData } from 'entities/user'

import { Icon, IconTheme } from 'shared/ui/icon'
import { Link, LinkTheme } from 'shared/ui/link'
import { HStack, VStack } from 'shared/ui/stack'

import { getMainNavigationItems } from '../model/selectors/get-main-navigation-items'

interface MainNavigationProps {
    className?: string
    short?: boolean
}

export const MainNavigation = memo(
    (props: MainNavigationProps): JSX.Element => {
        const { className, short } = props

        const { t } = useTranslation()
        const authData = useSelector(getUserAuthData)
        const mainNavigationItems = useSelector(getMainNavigationItems)

        const navigationItems = useMemo(
            () =>
                mainNavigationItems
                    .filter((item) => !item.authOnly || authData)
                    .map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            theme={LinkTheme.SECONDARY}
                        >
                            <HStack gap={10}>
                                <Icon
                                    src={item.Icon}
                                    theme={IconTheme.INVERTED_SECONDARY}
                                />
                                {!short && t(item.text)}
                            </HStack>
                        </Link>
                    )),
            [mainNavigationItems, authData, short, t],
        )

        return (
            <VStack className={className} gap={10}>
                {navigationItems}
            </VStack>
        )
    },
)
