import { useState, type JSX } from 'react'
import { useTranslation } from 'react-i18next'

import { classNames } from 'shared/lib/class-names'
import { Button, ButtonTheme } from 'shared/ui/button'
import { Input } from 'shared/ui/input'

import classes from './login-form.module.scss'

interface LoginFormProps {
    className?: string
}

export const LoginForm = (props: LoginFormProps): JSX.Element => {
    const { className } = props

    const { t } = useTranslation()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onChangeUsername = (value: string): void => {
        setUsername(value)
    }

    const onChangePassword = (value: string): void => {
        setPassword(value)
    }

    return (
        <div className={classNames(classes.loginForm, {}, [className])}>
            <div className={classes.loginFormInputs}>
                <Input
                    value={username}
                    onChange={onChangeUsername}
                    placeholder={t('Введите имя пользователя')}
                    autofocus
                />
                <Input
                    value={password}
                    onChange={onChangePassword}
                    placeholder={t('Введите пароль')}
                />
            </div>
            <Button
                className={classes.loginFormAuthBtn}
                theme={ButtonTheme.OUTLINE}
            >
                {t('Войти')}
            </Button>
        </div>
    )
}
