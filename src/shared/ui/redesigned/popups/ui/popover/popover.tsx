import {
    Popover as HeadlessPopover,
    PopoverButton,
    PopoverPanel,
} from '@headlessui/react'
import { memo, type ReactNode } from 'react'

import { classNames } from 'shared/lib/class-names'
import type { DropDownDirection } from 'shared/types/types'

import popupClasses from '../../styles/popup.module.scss'

import classes from './popover.module.scss'

interface PopoverProps {
    className?: string
    direction?: DropDownDirection
    trigger?: ReactNode
    children?: ReactNode
}

export const Popover = memo((props: PopoverProps) => {
    const { className, direction, trigger, children } = props

    return (
        <HeadlessPopover
            className={classNames(classes.popover, {}, [
                className,
                popupClasses.popup,
            ])}
        >
            <PopoverButton className={popupClasses.popupTrigger}>
                {trigger}
            </PopoverButton>
            <PopoverPanel
                className={classNames(classes.popoverMenu, {}, [
                    popupClasses.popupMenu,
                    popupClasses[direction || 'bottomLeft'],
                ])}
            >
                {children}
            </PopoverPanel>
        </HeadlessPopover>
    )
})
