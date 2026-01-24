import { type JSX, useCallback, useMemo, useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { NotificationsList } from 'entities/notification'
import { getUserAuthData, isUserAdmin, userActions } from 'entities/user'

import NotificationIcon from 'shared/assets/icons/notification.svg?react'
import { classNames } from 'shared/lib/class-names'
import { RoutePath } from 'shared/routes'
import { Avatar } from 'shared/ui/avatar'
import { Button } from 'shared/ui/button'
import { Drawer } from 'shared/ui/drawer'
import { Icon } from 'shared/ui/icon'
import { Link, LinkTheme } from 'shared/ui/link'
import { Dropdown, Popover } from 'shared/ui/popups'
import { Flex, FlexAlign, FlexJustify } from 'shared/ui/stack'

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
    const dispatch = useDispatch()
    const authData = useSelector(getUserAuthData)
    const isAdmin = useSelector(isUserAdmin)

    const logout = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch])

    const dropdownItems = useMemo(
        () => [
            ...(isAdmin
                ? [
                      {
                          content: 'Админка',
                          onClick: () => navigate(RoutePath.admin_panel),
                      },
                  ]
                : []),
            { content: t('Выйти'), onClick: logout },
        ],
        [isAdmin, logout, navigate, t],
    )

    const [isOpenDrawer, setIsOpenDrawer] = useState(false)

    return (
        <Flex
            className={classNames(classes.navbar, {}, [className])}
            align={FlexAlign.CENTER}
            justify={FlexJustify.END}
            gap={15}
            fullWidth
        >
            <Link to={RoutePath.article_create} theme={LinkTheme.SECONDARY}>
                Создать статью
            </Link>
            <MobileView>
                <Button onClick={() => setIsOpenDrawer(true)}>
                    <Icon src={NotificationIcon} />
                </Button>
                <Drawer
                    isOpen={isOpenDrawer}
                    onClose={() => setIsOpenDrawer(false)}
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
    )
}
