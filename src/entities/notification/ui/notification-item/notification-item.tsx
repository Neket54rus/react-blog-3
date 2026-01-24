import { memo } from 'react'

import { classNames } from 'shared/lib/class-names'
import { VStack } from 'shared/ui/stack'
import { SizeText, Text } from 'shared/ui/text'

import type { Notification } from '../../model/types/notification'

import classes from './notification-item.module.scss'

interface NotificationItemProps {
    className?: string
    item: Notification
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, item } = props

    return (
        <div className={classNames(classes.notificationItem, {}, [className])}>
            {/* <Text size={SizeText.L}>{item.title}</Text>
                <Text size={SizeText.M}>{item.descrtiption}</Text> */}
            <div>{item.title}</div>
            <div>{item.descrtiption}</div>
        </div>
    )
})
