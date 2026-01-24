import {
    Listbox as HeadlessListBox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/react'
import { Fragment, memo, type ReactNode } from 'react'

import { classNames } from 'shared/lib/class-names'
import type { DropDownDirection } from 'shared/types/types'
import { Button, ButtonTheme } from 'shared/ui/button'

import popupClasses from '../../styles/popup.module.scss'

import classes from './list-box.module.scss'

interface ListBoxItem {
    value?: string
    content?: ReactNode
    disabled?: boolean
}

interface ListBoxProps {
    items?: ListBoxItem[]
    value?: string
    defaultValue?: string
    className?: string
    direction?: DropDownDirection
    onChange?: <T extends string>(value: T) => void
}

export const ListBox = memo((props: ListBoxProps) => {
    const { items, value, defaultValue, className, direction, onChange } = props

    return (
        <HeadlessListBox
            className={classNames(classes.listBox, {}, [
                className,
                popupClasses.popup,
            ])}
            as="div"
            value={value}
            onChange={onChange}
        >
            <ListboxButton className={popupClasses.popupTrigger}>
                <Button theme={ButtonTheme.OUTLINE}>
                    {value || defaultValue || 'Выберите значение'}
                </Button>
            </ListboxButton>
            <ListboxOptions
                className={classNames(classes.listBoxOptions, {}, [
                    popupClasses.popupMenu,
                    popupClasses[direction || 'bottomLeft'],
                ])}
            >
                {items?.map((item) => (
                    <ListboxOption
                        key={item.value}
                        value={item.value}
                        as={Fragment}
                        disabled={item.disabled}
                    >
                        {({ focus, selected }) => (
                            <li
                                className={classNames(
                                    classes.listBoxOptionsItem,
                                    {
                                        [popupClasses.focus]: focus,
                                        [classes.disabled]:
                                            item.disabled || false,
                                    },
                                    [popupClasses.popupMenuItem],
                                )}
                            >
                                {selected && '!!!'}
                                {item.content}
                            </li>
                        )}
                    </ListboxOption>
                ))}
            </ListboxOptions>
        </HeadlessListBox>
    )
})
