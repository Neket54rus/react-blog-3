import { memo } from 'react'

import { classNames } from 'shared/lib/class-names'
import { ToggleFeatures } from 'shared/lib/features'
import { Card } from 'shared/ui/redesigned/card'

import type { Notification } from '../../model/types/notification'

import classes from './notification-item.module.scss'

interface NotificationItemProps {
    className?: string
    item: Notification
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, item } = props

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card
                    className={classNames(classes.notificationItem, {}, [
                        className,
                    ])}
                >
                    <div>{item.title}</div>
                    <div>{item.descrtiption}</div>
                </Card>
            }
            off={
                <div
                    className={classNames(classes.notificationItem, {}, [
                        className,
                    ])}
                >
                    <div>{item.title}</div>
                    <div>{item.descrtiption}</div>
                </div>
            }
        />
    )
})
