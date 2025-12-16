import { memo, useCallback, type JSX } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { classNames } from 'shared/lib/class-names'
import {
    DynamicModuleLoader,
    type ReducersList,
} from 'shared/lib/components/dynamic-module-loader/dynamic-module-loader'
import { useAppDispatch } from 'shared/lib/store/use-app-dispatch'
import { Button, ButtonTheme } from 'shared/ui/button'
import { Input } from 'shared/ui/input'
import { ColorText, SizeText, Text } from 'shared/ui/text'

import { getLoginState } from '../model/selectors/get-login-state'
import { loginByUsername } from '../model/services/login-by-username/login-by-username'
import { loginActions, loginReducer } from '../model/slice/login-slice'

import classes from './login-form.module.scss'

interface LoginFormProps {
    className?: string
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
}

const LoginForm = memo((props: LoginFormProps): JSX.Element => {
    const { className } = props

    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const { username, password, error, isLoading } = useSelector(getLoginState)

    const onChangeUsername = useCallback(
        (value: string): void => {
            dispatch(loginActions.setUsername(value))
        },
        [dispatch],
    )

    const onChangePassword = useCallback(
        (value: string): void => {
            dispatch(loginActions.setPassword(value))
        },
        [dispatch],
    )

    const onLogin = useCallback((): void => {
        dispatch(loginByUsername({ username, password }))
    }, [dispatch, password, username])

    return (
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
            <div className={classNames(classes.loginForm, {}, [className])}>
                <div className={classes.loginFormInputs}>
                    <Text size={SizeText.L}>{t('Форма авторизации')}</Text>
                    {error && <Text color={ColorText.ERROR}>{error}</Text>}
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
                    onClick={onLogin}
                    disabled={isLoading}
                >
                    {t('Войти')}
                </Button>
            </div>
        </DynamicModuleLoader>
    )
})

export default LoginForm
