import { useState, type JSX } from 'react'
import { useTranslation } from 'react-i18next'

import { classNames } from 'shared/lib/class-names'
import { Button, ButtonTheme } from 'shared/ui/button'
import { Modal } from 'shared/ui/modal/modal'

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
            <Modal
                isOpen={authorizationModalOpen}
                onClose={closeAutorizationModal}
            >
                <h1>Авторизация</h1>
            </Modal>
        </div>
    )
}
