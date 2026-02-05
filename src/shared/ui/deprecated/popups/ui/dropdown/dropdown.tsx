import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Fragment, memo, type ReactNode } from 'react'

import { classNames } from 'shared/lib/class-names'
import type { DropDownDirection } from 'shared/types/types'

import popupClasses from '../../styles/popup.module.scss'

import classes from './dropdown.module.scss'

interface DropdownItem {
    disabled?: boolean
    content?: ReactNode
    onClick?: () => void
    hreg?: string
}

interface DropdownProps {
    className?: string
    items?: DropdownItem[]
    trigger?: ReactNode
    direction?: DropDownDirection
}

export const Dropdown = memo((props: DropdownProps) => {
    const { className, items, trigger, direction } = props

    return (
        <Menu
            className={classNames(classes.dropdown, {}, [
                className,
                popupClasses.popup,
            ])}
            as="div"
        >
            <MenuButton className={popupClasses.popupTrigger}>
                {trigger}
            </MenuButton>
            <MenuItems
                className={classNames(classes.dropdownMenu, {}, [
                    popupClasses.popupMenu,
                    popupClasses[direction || 'bottomRight'],
                ])}
            >
                {items?.map((item, index) => (
                    <MenuItem
                        key={index}
                        as={Fragment}
                        disabled={item.disabled}
                    >
                        {({ focus }) => (
                            <button
                                className={classNames(
                                    classes.dropdownMenuItem,
                                    {
                                        [popupClasses.focus]: focus,
                                    },
                                    [popupClasses.popupMenuItem],
                                )}
                                onClick={item.onClick}
                            >
                                {item.content}
                            </button>
                        )}
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    )
})
