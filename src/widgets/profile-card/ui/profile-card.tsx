import { memo, type JSX } from 'react'
import { useSelector } from 'react-redux'

import { EditProfileForm, getEditProfileState } from 'features/edit-profile'

import { getProfileState, ProfileInfo } from 'entities/profile'

interface ProfileCardProps {
    className?: string
}

export const ProfileCard = memo((props: ProfileCardProps): JSX.Element => {
    const { className } = props

    const { data, isLoading, error } = useSelector(getProfileState)
    const { readonly } = useSelector(getEditProfileState)

    return (
        <div className={className}>
            {readonly ? (
                <ProfileInfo
                    profile={data}
                    loading={isLoading}
                    error={error}
                    readonly={readonly}
                />
            ) : (
                <EditProfileForm />
            )}
        </div>
    )
})
