import { memo, useCallback, type JSX } from 'react'
import { useSelector } from 'react-redux'

import { Currency, CurrencySelect } from 'entities/currency'

import { Country } from 'shared/constants/country'
import { classNames } from 'shared/lib/class-names'
import { useAppDispatch } from 'shared/lib/store/use-app-dispatch'
import { Input } from 'shared/ui/input'
import { ListBox } from 'shared/ui/list-box'
import { Spinner } from 'shared/ui/spinner'
import { ColorText, SizeText, Text } from 'shared/ui/text'

import { ValidatePorfileError } from '../../model/config/profile.constants'
import { getEditProfileState } from '../../model/selectors/get-readonly/get-edit-profile-state'
import { editProfileAction } from '../../model/slices/edit-profile-slice'

import classes from './edit-profile-form.module.scss'

interface EditProfileFormProps {
    className?: string
}

const currency = Object.values(Currency).map((val) => ({
    value: val,
    content: val,
}))

const country = Object.values(Country).map((val) => ({
    value: val,
    content: val,
}))

const validateErrorText = {
    [ValidatePorfileError.INCORRECT_USER_DATA]:
        'Не корректные данные пользователя',
    [ValidatePorfileError.NO_DATA]: 'Нет данных',
    [ValidatePorfileError.SERVER_ERROR]: 'Ошибка сервера',
}

export const EditProfileForm = memo(
    (props: EditProfileFormProps): JSX.Element => {
        const { className } = props

        const { form, isLoading, error, validateError } =
            useSelector(getEditProfileState)

        const dispatch = useAppDispatch()

        const onChangeFirstName = useCallback(
            (value: string) => {
                dispatch(editProfileAction.updateForm({ firstName: value }))
            },
            [dispatch],
        )

        const onChangeLastName = useCallback(
            (value: string) => {
                dispatch(editProfileAction.updateForm({ lastName: value }))
            },
            [dispatch],
        )

        const onChangeAge = useCallback(
            (value: string) => {
                const cleanValue = value.replace(/[^\d]/g, '')

                if (cleanValue === '' && value !== '') {
                    return
                }

                if (cleanValue !== '') {
                    const num = parseInt(cleanValue, 10)
                    if (num <= 150) {
                        dispatch(editProfileAction.updateForm({ age: num }))
                    }
                } else {
                    dispatch(editProfileAction.updateForm({ age: 0 }))
                }
            },
            [dispatch],
        )

        const onChangeCurrency = useCallback(
            (value: string) => {
                dispatch(
                    editProfileAction.updateForm({
                        currency: value as Currency,
                    }),
                )
            },
            [dispatch],
        )

        const onChangeCountry = useCallback(
            (value: string) => {
                dispatch(
                    editProfileAction.updateForm({ country: value as Country }),
                )
            },
            [dispatch],
        )

        const onChangeCity = useCallback(
            (value: string) => {
                dispatch(editProfileAction.updateForm({ city: value }))
            },
            [dispatch],
        )

        const onChangeUsername = useCallback(
            (value: string) => {
                dispatch(editProfileAction.updateForm({ username: value }))
            },
            [dispatch],
        )

        const onChangeAvatar = useCallback(
            (value: string) => {
                dispatch(editProfileAction.updateForm({ avatar: value }))
            },
            [dispatch],
        )

        if (isLoading) {
            return (
                <div
                    className={classNames(classes.editProfileForm, {}, [
                        className,
                        classes.editProfileFormLoading,
                    ])}
                >
                    <Spinner />
                </div>
            )
        }

        if (error) {
            return (
                <div
                    className={classNames(classes.editProfileForm, {}, [
                        className,
                        classes.editProfileFormError,
                    ])}
                >
                    <Text size={SizeText.L} color={ColorText.ERROR}>
                        {error}
                    </Text>
                </div>
            )
        }

        if (!form) {
            return (
                <div
                    className={classNames(classes.editProfileForm, {}, [
                        className,
                        classes.editProfileFormNoData,
                    ])}
                >
                    <Text size={SizeText.L} color={ColorText.ERROR}>
                        Нет данных
                    </Text>
                </div>
            )
        }

        return (
            <div
                className={classNames(classes.editProfileForm, {}, [className])}
            >
                {validateError?.map((error) => (
                    <Text key={error} color={ColorText.ERROR}>
                        {validateErrorText[error]}
                    </Text>
                ))}
                <Input
                    value={form.firstName || ''}
                    className={classes.editProfileFormInput}
                    placeholder="Ваше имя"
                    onChange={onChangeFirstName}
                />
                <Input
                    value={form.lastName || ''}
                    className={classes.editProfileFormInput}
                    placeholder="Ваша фамилия"
                    onChange={onChangeLastName}
                />
                <Input
                    value={form.age || ''}
                    className={classes.editProfileFormInput}
                    placeholder="Ваш возраст"
                    onChange={onChangeAge}
                />
                <CurrencySelect
                    options={currency}
                    onChange={onChangeCurrency}
                    value={form.currency}
                />
                <ListBox
                    items={country}
                    onChange={onChangeCountry}
                    value={form.country}
                    direction="top"
                />
                <Input
                    value={form.city || ''}
                    className={classes.editProfileFormInput}
                    placeholder="Ваш город"
                    onChange={onChangeCity}
                />
                <Input
                    value={form.username || ''}
                    className={classes.editProfileFormInput}
                    placeholder="Ваше имя пользователя"
                    onChange={onChangeUsername}
                />
                <Input
                    value={form.avatar || ''}
                    className={classes.editProfileFormInput}
                    placeholder="Ссылка на ваш аватар"
                    onChange={onChangeAvatar}
                />
            </div>
        )
    },
)
