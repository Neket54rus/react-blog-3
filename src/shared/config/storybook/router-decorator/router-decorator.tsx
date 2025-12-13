import { type Decorator } from '@storybook/react'
import { type JSX } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'

export const RouterDecorator: Decorator = (Story): JSX.Element => (
    <RouterProvider
        router={createBrowserRouter([{ path: '*', element: <Story /> }])}
    />
)
