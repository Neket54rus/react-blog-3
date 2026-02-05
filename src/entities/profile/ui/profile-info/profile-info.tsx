import { memo, type JSX } from 'react'

import { classNames } from 'shared/lib/class-names'
import { Avatar } from 'shared/ui/deprecated/avatar'
import { Spinner } from 'shared/ui/deprecated/spinner'
import { VStack } from 'shared/ui/deprecated/stack'
import { ColorText, SizeText, Text } from 'shared/ui/deprecated/text'

import { type Profile } from '../../model/types/profile'

import classes from './profile-info.module.scss'

interface ProfileInfoProps {
    profile?: Profile
    loading?: boolean
    error?: string
    readonly?: boolean
    className?: string
}

export const ProfileInfo = memo((props: ProfileInfoProps): JSX.Element => {
    const { profile, loading, error, readonly = false, className } = props

    if (loading) {
        return (
            <div
                className={classNames(classes.profileInfo, {}, [
                    className,
                    classes.profileInfoLoading,
                ])}
            >
                <Spinner />
            </div>
        )
    }

    if (error) {
        return (
            <div
                className={classNames(classes.profileInfo, {}, [
                    className,
                    classes.profileInfoError,
                ])}
            >
                <Text size={SizeText.L} color={ColorText.ERROR}>
                    {error}
                </Text>
            </div>
        )
    }

    if (!profile) {
        return (
            <div
                className={classNames(classes.profileInfo, {}, [
                    className,
                    classes.profileInfoNoData,
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
            data-testid="profile-info"
            className={classNames(classes.profileInfo, {}, [className])}
        >
            <Avatar src={profile.avatar} />
            <VStack className={classes.profileInfoFields} gap={10} fullWidth>
                <div
                    className={classNames(classes.profileInfoText, {
                        [classes.readonly]: readonly,
                    })}
                >
                    <Text dataTestId="first-name">
                        {profile.firstName || 'Не установлено'}
                    </Text>
                </div>
                <div
                    className={classNames(classes.profileInfoText, {
                        [classes.readonly]: readonly,
                    })}
                >
                    <Text dataTestId="last-name">
                        {profile.lastName || 'Не установлено'}
                    </Text>
                </div>
                <div
                    className={classNames(classes.profileInfoText, {
                        [classes.readonly]: readonly,
                    })}
                >
                    <Text>{profile.age?.toString() || 'Не установлено'}</Text>
                </div>
                <div
                    className={classNames(classes.profileInfoText, {
                        [classes.readonly]: readonly,
                    })}
                >
                    <Text>{profile.currency || 'Не установлено'}</Text>
                </div>
                <div
                    className={classNames(classes.profileInfoText, {
                        [classes.readonly]: readonly,
                    })}
                >
                    <Text>{profile.country || 'Не установлено'}</Text>
                </div>
                <div
                    className={classNames(classes.profileInfoText, {
                        [classes.readonly]: readonly,
                    })}
                >
                    <Text>{profile.city || 'Не установлено'}</Text>
                </div>
                <div
                    className={classNames(classes.profileInfoText, {
                        [classes.readonly]: readonly,
                    })}
                >
                    <Text>{profile.username || 'Не установлено'}</Text>
                </div>
                <div
                    className={classNames(classes.profileInfoText, {
                        [classes.readonly]: readonly,
                    })}
                >
                    <Text>{profile.avatar || 'Не установлено'}</Text>
                </div>
            </VStack>
        </div>
    )
})
