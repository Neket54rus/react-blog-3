import { memo } from 'react'

import { VStack } from 'shared/ui/stack'

import { useGetNotificationsListQuery } from '../../api/notification-api'
import { NotificationItem } from '../notification-item/notification-item'

interface NotificationsListProps {
    className?: string
    userId: string
}

export const NotificationsList = memo((props: NotificationsListProps) => {
    const { className, userId } = props

    const { data, isLoading } = useGetNotificationsListQuery(userId, {
        pollingInterval: 5000,
    })

    if (isLoading) {
        return 'Loading...'
    }

    if (!data) {
        return 'Error'
    }

    return (
        <VStack className={className} fullWidth>
            {data.map((n) => (
                <NotificationItem key={n.id} item={n} />
            ))}
        </VStack>
    )
})
