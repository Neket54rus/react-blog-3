import { memo, useEffect, type JSX } from 'react'
import { useParams } from 'react-router'

import { Page } from 'widgets/page'
import { ProfileCard } from 'widgets/profile-card'

import { EditProfileControls, editProfileReducer } from 'features/edit-profile'

import { fetchProfileData, profileReducer } from 'entities/profile'
import { useUserAuthData } from 'entities/user'

import {
    DynamicModuleLoader,
    type ReducersList,
} from 'shared/lib/components/dynamic-module-loader/dynamic-module-loader'
import { useAppDispatch } from 'shared/lib/store/use-app-dispatch'
import { Text, SizeText } from 'shared/ui/text'

import classes from './profile-page.module.scss'

const reducers: ReducersList = {
    profile: profileReducer,
    editProfile: editProfileReducer,
}

const ProfilePage = memo((): JSX.Element => {
    const dispatch = useAppDispatch()

    const { id } = useParams<{ id: string }>()

    const authData = useUserAuthData()

    useEffect(() => {
        if (id && __PROJECT__ !== 'storybook') {
            dispatch(fetchProfileData(id))
        }
    }, [dispatch, id])

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classes.profilePage}>
                <div className={classes.profilePageHeader}>
                    <Text size={SizeText.L}>Профиль</Text>
                    {authData?.username === id && <EditProfileControls />}
                </div>
                <ProfileCard />
            </Page>
        </DynamicModuleLoader>
    )
})

export default ProfilePage
