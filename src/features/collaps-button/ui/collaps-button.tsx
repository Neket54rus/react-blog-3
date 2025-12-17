import { memo, type JSX } from 'react'

import { Button, ButtonSize, ButtonTheme } from 'shared/ui/button'

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
            className={className}
            onClick={onClick}
            theme={ButtonTheme.BACKGROUND_INVERTED}
            size={ButtonSize.L}
            square
        >
            {collapsed ? '>' : '<'}
        </Button>
    )
})
