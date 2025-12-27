import { memo, useEffect, type JSX } from 'react'

import { ProfileCard } from 'widgets/profile-card'

import { EditProfileControls, editProfileReducer } from 'features/edit-profile'

import { fetchProfileData, profileReducer } from 'entities/profile'

import { DynamicModuleLoader } from 'shared/lib/components/dynamic-module-loader/dynamic-module-loader'
import { useAppDispatch } from 'shared/lib/store/use-app-dispatch'
import { Text, SizeText } from 'shared/ui/text'

import classes from './profile-page.module.scss'

const ProfilePage = memo((): JSX.Element => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchProfileData())
    }, [dispatch])

    return (
        <DynamicModuleLoader
            reducers={{
                profile: profileReducer,
                editProfile: editProfileReducer,
            }}
            removeAfterUnmount
        >
            <div className={classes.profilePage}>
                <div className={classes.profilePageHeader}>
                    <Text size={SizeText.L}>Профиль</Text>
                    <EditProfileControls />
                </div>
                <ProfileCard />
            </div>
        </DynamicModuleLoader>
    )
})

export default ProfilePage
