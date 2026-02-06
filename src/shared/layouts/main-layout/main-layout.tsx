import { memo, type ReactNode } from 'react'

import { classNames } from 'shared/lib/class-names'

import classes from './main-layout.module.scss'

interface MainLayoutProps {
    className?: string
    header?: ReactNode
    content?: ReactNode
    sidebar?: ReactNode
    toolbar?: ReactNode
    collapsed: boolean
}

export const MainLayout = memo((props: MainLayoutProps) => {
    const { className, header, content, sidebar, toolbar, collapsed } = props

    return (
        <div
            className={classNames(
                classes.mainLayout,
                { [classes.collapsed]: collapsed },
                [className],
            )}
        >
            <div className={classes.sidebar}>{sidebar}</div>
            <div className={classes.content}>{content}</div>
            <div className={classes.rightbar}>
                <div className={classes.header}>{header}</div>
                <div className={classes.toolbar}>{toolbar}</div>
            </div>
        </div>
    )
})
