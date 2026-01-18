import { type JSX, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { userActions } from 'entities/user'

import { classNames } from 'shared/lib/class-names'
import { RoutePath } from 'shared/routes'
import { Button, ButtonTheme } from 'shared/ui/button'
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
    const dispatch = useDispatch()

    const logout = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch])

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
            <Button onClick={logout} theme={ButtonTheme.CLEAR_INVERTED}>
                {t('Выйти')}
            </Button>
        </Flex>
    )
}
