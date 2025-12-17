import { memo, type JSX } from 'react'

import { profileReducer } from 'entities/profile'

import { DynamicModuleLoader } from 'shared/lib/components/dynamic-module-loader/dynamic-module-loader'

import classes from './profile-page.module.scss'

const ProfilePage = memo(
    (): JSX.Element => (
        <DynamicModuleLoader
            reducers={{ profile: profileReducer }}
            removeAfterUnmount
        >
            <div className={classes.profilePage}>Profile page</div>
        </DynamicModuleLoader>
    ),
)

export default ProfilePage
