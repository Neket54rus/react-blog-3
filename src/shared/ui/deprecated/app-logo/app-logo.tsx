import { memo } from 'react'

import AppIcon from 'shared/assets/icons/app-image.svg?react'
import { classNames } from 'shared/lib/class-names'

import { HStack } from '../stack'

import classes from './app-logo.module.scss'

interface AppLogoProps {
    className?: string
}

/**
 * @deprecated
 */
export const AppLogo = memo((props: AppLogoProps) => {
    const { className } = props

    return (
        <HStack
            className={classNames(classes.appLogoWrapper, {}, [className])}
            fullWidth
            justify="center"
        >
            <div className={classes.gradientBig} />
            <div className={classes.gradientSmall} />
            <AppIcon className={classes.appLogo} />
        </HStack>
    )
})
