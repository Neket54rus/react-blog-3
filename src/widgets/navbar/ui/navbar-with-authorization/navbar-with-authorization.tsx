import { type JSX, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { getUserAuthData, isUserAdmin, userActions } from 'entities/user'

import { classNames } from 'shared/lib/class-names'
import { RoutePath } from 'shared/routes'
import { Avatar } from 'shared/ui/avatar'
import { Dropdown } from 'shared/ui/dropdown'
import { Link, LinkTheme } from 'shared/ui/link'
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
            <Dropdown
                trigger={<Avatar src={authData?.avatar} size={30} />}
                items={dropdownItems}
                direction="bottomLeft"
            />
        </Flex>
    )
}
