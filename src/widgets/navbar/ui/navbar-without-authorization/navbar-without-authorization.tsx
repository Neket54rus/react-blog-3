import { useState, type JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { LoginModal } from 'widgets/login-modal'

import { loginActions } from 'features/login-form'

import { classNames } from 'shared/lib/class-names'
import { Button, ButtonTheme } from 'shared/ui/button'

import classes from '../navbar.module.scss'

interface NavbarWithoutAuthorizationProps {
    className?: string
}

export const NavbarWithoutAuthorization = (
    props: NavbarWithoutAuthorizationProps,
): JSX.Element => {
    const { className } = props

    const { t } = useTranslation()
    const dispatch = useDispatch()

    const [authorizationModalOpen, setAuthorizationModalOpen] = useState(false)

    const openAutorizationModal = (): void => {
        setAuthorizationModalOpen(true)
    }

    const closeAutorizationModal = (): void => {
        setAuthorizationModalOpen(false)
        dispatch(loginActions.setDefaultState())
    }

    return (
        <div className={classNames(classes.navbar, {}, [className])}>
            <Button
                onClick={openAutorizationModal}
                theme={ButtonTheme.CLEAR_INVERTED}
            >
                {t('Войти')}
            </Button>
            <LoginModal
                isOpen={authorizationModalOpen}
                onClose={closeAutorizationModal}
            />
        </div>
    )
}
