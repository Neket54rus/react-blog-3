import { memo, type JSX } from 'react'

import ArrovIcon from 'shared/assets/icons/arrow-bottom.svg?react'
import { classNames } from 'shared/lib/class-names'
import { ToggleFeatures } from 'shared/lib/features'
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/deprecated/button'

import classes from './collaps-button.module.scss'

interface CollapsButtonProps {
    onClick: () => void
    collapsed: boolean
    className?: string
}

export const CollapsButton = memo((props: CollapsButtonProps): JSX.Element => {
    const { onClick, collapsed, className } = props

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <ArrovIcon
                    data-testid="sidebar-toggle"
                    className={classNames(
                        classes.collapsButton,
                        {
                            [classes.collapsed]: collapsed,
                        },
                        [className],
                    )}
                    onClick={onClick}
                />
            }
            off={
                <Button
                    data-testid="sidebar-toggle"
                    className={classNames(classes.collapsButtonDeprecated, {}, [
                        className,
                    ])}
                    onClick={onClick}
                    theme={ButtonTheme.BACKGROUND_INVERTED}
                    size={ButtonSize.L}
                    square
                >
                    {collapsed ? '>' : '<'}
                </Button>
            }
        />
    )
})
