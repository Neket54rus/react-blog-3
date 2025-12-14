import { useState, type JSX } from 'react'
import { useTranslation } from 'react-i18next'

import { LoginModal } from 'widgets/login-modal'

import { classNames } from 'shared/lib/class-names'
import { Button, ButtonTheme } from 'shared/ui/button'

import classes from './navbar.module.scss'

interface NavbarProps {
    className?: string
}

export const Navbar = (props: NavbarProps): JSX.Element => {
    const { className } = props

    const { t } = useTranslation()

    const [authorizationModalOpen, setAuthorizationModalOpen] = useState(false)

    const openAutorizationModal = (): void => {
        setAuthorizationModalOpen(true)
    }

    const closeAutorizationModal = (): void => {
        setAuthorizationModalOpen(false)
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
