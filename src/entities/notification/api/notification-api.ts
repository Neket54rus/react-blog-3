import { rtkApi } from 'shared/api/rtkApi'

import type { Notification } from '../model/types/notification'

const notificationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotificationsList: build.query<Notification[], string>({
            query: (userId: string) => ({
                url: `/notifications`,
                params: {
                    userId,
                },
            }),
        }),
    }),
})

export const { useGetNotificationsListQuery } = notificationApi
