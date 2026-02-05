import { type JSX, useCallback, type ReactNode } from 'react'

import { classNames } from 'shared/lib/class-names'

import { Button, ButtonTheme } from '../button'

import classes from './tabs.module.scss'

export interface TabItem<T> {
    value: T
    content: ReactNode
}

interface TabsProps<T> {
    tabs: TabItem<T>[]
    value?: string
    onTabClick: (tab: TabItem<T>) => void
    className?: string
}

export const Tabs = <T extends string>(props: TabsProps<T>): JSX.Element => {
    const { tabs, value, className, onTabClick } = props

    const handlerTabClick = useCallback(
        (tab: TabItem<T>) => () => {
            onTabClick(tab)
        },
        [onTabClick],
    )

    return (
        <div className={classNames(classes.tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Button
                    key={tab.value}
                    theme={ButtonTheme.OUTLINE}
                    onClick={handlerTabClick(tab)}
                    active={value === tab.value}
                >
                    {tab.content}
                </Button>
            ))}
        </div>
    )
}
