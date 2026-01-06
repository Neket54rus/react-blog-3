import { memo, useCallback, type JSX } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { getProfileState } from 'entities/profile'

import { classNames } from 'shared/lib/class-names'
import { useAppDispatch } from 'shared/lib/store/use-app-dispatch'
import { Button, ButtonTheme } from 'shared/ui/button'

import { getEditProfileState } from '../../model/selectors/get-readonly/get-edit-profile-state'
import { updateProfileData } from '../../model/services/update-profile-data/update-profile-data'
import { editProfileAction } from '../../model/slices/edit-profile-slice'

import classes from './edit-profile-controls.module.scss'

interface EditProfileControlsProps {
    className?: string
}

export const EditProfileControls = memo(
    (props: EditProfileControlsProps): JSX.Element => {
        const { className } = props

        const { data, isLoading: isLoadingProfileData } =
            useSelector(getProfileState)
        const { readonly, isLoading: isLoadingUpdateProfileData } =
            useSelector(getEditProfileState)

        const dispatch = useAppDispatch()

        const { id } = useParams<{ id: string }>()

        const onEnableEdit = useCallback(() => {
            dispatch(editProfileAction.setReadonly(false))

            if (data) {
                dispatch(editProfileAction.setForm(data))
            }
        }, [dispatch, data])

        const onDisableEdit = useCallback(() => {
            dispatch(editProfileAction.setReadonly(true))
            dispatch(editProfileAction.resetForm())
        }, [dispatch])

        const onSave = useCallback(() => {
            if (id) {
                dispatch(updateProfileData(id))
            }
        }, [dispatch, id])

        return readonly ? (
            <Button
                className={className}
                theme={ButtonTheme.OUTLINE}
                onClick={onEnableEdit}
                disabled={isLoadingProfileData || !data}
            >
                Редактировать
            </Button>
        ) : (
            <div
                className={classNames(classes.editProfileControls, {}, [
                    className,
                ])}
            >
                <Button
                    theme={ButtonTheme.OUTLINE}
                    onClick={onSave}
                    disabled={isLoadingUpdateProfileData}
                >
                    Сохранить
                </Button>
                <Button
                    theme={ButtonTheme.RED}
                    onClick={onDisableEdit}
                    disabled={isLoadingUpdateProfileData}
                >
                    Отменить
                </Button>
            </div>
        )
    },
)
