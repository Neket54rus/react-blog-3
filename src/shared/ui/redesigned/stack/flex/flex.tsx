import { type CSSProperties, useMemo, type JSX, type ReactNode } from 'react'

import { classNames, type Mods } from 'shared/lib/class-names'

import { FlexAlign, FlexDirection, FlexJustify } from './flex.constants'
import classes from './flex.module.scss'

export interface FlexProps {
    children?: ReactNode
    justify?: FlexJustify
    align?: FlexAlign
    direction?: FlexDirection
    gap?: number
    fullWidth?: boolean
    className?: string
}

export const Flex = (props: FlexProps): JSX.Element => {
    const { children, justify, align, direction, gap, fullWidth, className } =
        props

    const mods: Mods = useMemo(
        () => ({
            // justify
            [classes.justifyStart]: justify === FlexJustify.START,
            [classes.justifyEnd]: justify === FlexJustify.END,
            [classes.justifyCenter]: justify === FlexJustify.CENTER,
            [classes.justifyBetween]: justify === FlexJustify.BETWEEN,

            // align
            [classes.alignStart]: align === FlexAlign.START,
            [classes.alignEnd]: align === FlexAlign.END,
            [classes.alignCenter]: align === FlexAlign.CENTER,

            // direction
            [classes.directionRow]: direction === FlexDirection.ROW,
            [classes.directionColumn]: direction === FlexDirection.COLUMN,

            // fullWidth
            [classes.fullWidth]: !!fullWidth,
        }),
        [align, direction, fullWidth, justify],
    )

    const styles: CSSProperties = useMemo(
        () => ({
            gap: `${gap}px`,
        }),
        [gap],
    )

    return (
        <div
            className={classNames(classes.flex, mods, [className])}
            style={styles}
        >
            {children}
        </div>
    )
}
