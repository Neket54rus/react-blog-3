import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Fragment, memo, type ReactNode } from 'react'

import { classNames } from 'shared/lib/class-names'
import type { DropDownDirection } from 'shared/types/types'

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
            className={classNames(classes.dropdown, {}, [className])}
            as="div"
        >
            <MenuButton className={classes.dropdownTrigger}>
                {trigger}
            </MenuButton>
            <MenuItems
                className={classNames(classes.dropdownMenu, {}, [
                    classes[direction || 'bottomRight'],
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
                                        [classes.focus]: focus,
                                    },
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
