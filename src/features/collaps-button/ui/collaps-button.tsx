import { memo, type JSX } from 'react'

import { classNames } from 'shared/lib/class-names'
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/button'

import classes from './collaps-button.module.scss'

interface CollapsButtonProps {
    onClick: () => void
    collapsed: boolean
    className?: string
}

export const CollapsButton = memo((props: CollapsButtonProps): JSX.Element => {
    const { onClick, collapsed, className } = props

    return (
        <Button
            data-testid="sidebar-toggle"
            className={classNames(classes.collapsButton, {}, [className])}
            onClick={onClick}
            theme={ButtonTheme.BACKGROUND_INVERTED}
            size={ButtonSize.L}
            square
        >
            {collapsed ? '>' : '<'}
        </Button>
    )
})
