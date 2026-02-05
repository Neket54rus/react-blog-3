import { type JSX, useCallback, useMemo, useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { NotificationsList } from 'entities/notification'
import { useUserAuthData, isUserAdmin, useUserActions } from 'entities/user'

import NotificationIcon from 'shared/assets/icons/notification.svg?react'
import { classNames } from 'shared/lib/class-names'
import { ToggleFeatures } from 'shared/lib/features'
import {
    getRouteAdminPanel,
    getRouteArticleCreate,
} from 'shared/routes/constants'
import { Avatar } from 'shared/ui/deprecated/avatar'
import { Button } from 'shared/ui/deprecated/button'
import { Drawer } from 'shared/ui/deprecated/drawer'
import { Icon } from 'shared/ui/deprecated/icon'
import { Link, LinkTheme } from 'shared/ui/deprecated/link'
import { Dropdown, Popover } from 'shared/ui/deprecated/popups'
import { Flex, FlexAlign, FlexJustify } from 'shared/ui/deprecated/stack'

import classes from '../navbar.module.scss'

interface NavbarWithAuthorizationProps {
    className?: string
}

export const NavbarWithAuthorization = (
    props: NavbarWithAuthorizationProps,
): JSX.Element => {
    const { className } = props

    const { t } = useTranslation()
    const navigate = useNavigate()
    const authData = useUserAuthData()
    const isAdmin = useSelector(isUserAdmin)

    const { logout } = useUserActions()

    const handleLogout = useCallback(() => {
        logout()
    }, [logout])

    const dropdownItems = useMemo(
        () => [
            ...(isAdmin
                ? [
                      {
                          content: 'Админка',
                          onClick: () => navigate(getRouteAdminPanel()),
                      },
                  ]
                : []),
            { content: t('Выйти'), onClick: handleLogout },
        ],
        [isAdmin, handleLogout, navigate, t],
    )

    const [isOpenDrawer, setIsOpenDrawer] = useState(false)

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Flex
                    className={classNames(classes.navbarRedesigned, {}, [
                        className,
                    ])}
                    align={FlexAlign.CENTER}
                    justify={FlexJustify.END}
                    gap={16}
                    fullWidth
                >
                    <MobileView>
                        <Button onClick={() => setIsOpenDrawer(true)}>
                            <Icon src={NotificationIcon} />
                        </Button>
                        <Drawer
                            isOpen={isOpenDrawer}
                            onClose={() => setIsOpenDrawer(false)}
                            lazy
                        >
                            <NotificationsList userId={authData!.username} />
                        </Drawer>
                    </MobileView>
                    <BrowserView>
                        <Popover
                            trigger={
                                <Button>
                                    <Icon src={NotificationIcon} />
                                </Button>
                            }
                        >
                            {authData && (
                                <NotificationsList userId={authData.username} />
                            )}
                        </Popover>
                    </BrowserView>
                    <Dropdown
                        trigger={<Avatar src={authData?.avatar} size={30} />}
                        items={dropdownItems}
                        direction="bottomLeft"
                    />
                </Flex>
            }
            off={
                <Flex
                    className={classNames(classes.navbar, {}, [className])}
                    align={FlexAlign.CENTER}
                    justify={FlexJustify.END}
                    gap={15}
                    fullWidth
                >
                    <Link
                        to={getRouteArticleCreate()}
                        theme={LinkTheme.SECONDARY}
                    >
                        Создать статью
                    </Link>
                    <MobileView>
                        <Button onClick={() => setIsOpenDrawer(true)}>
                            <Icon src={NotificationIcon} />
                        </Button>
                        <Drawer
                            isOpen={isOpenDrawer}
                            onClose={() => setIsOpenDrawer(false)}
                            lazy
                        >
                            <NotificationsList userId={authData!.username} />
                        </Drawer>
                    </MobileView>
                    <BrowserView>
                        <Popover
                            trigger={
                                <Button>
                                    <Icon src={NotificationIcon} />
                                </Button>
                            }
                        >
                            {authData && (
                                <NotificationsList userId={authData.username} />
                            )}
                        </Popover>
                    </BrowserView>
                    <Dropdown
                        trigger={<Avatar src={authData?.avatar} size={30} />}
                        items={dropdownItems}
                        direction="bottomLeft"
                    />
                </Flex>
            }
        />
    )
}
