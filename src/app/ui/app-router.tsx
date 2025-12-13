import { type JSX } from 'react'
import { RouterProvider } from 'react-router'

import { router } from 'app/providers/router'

export const AppRouter = (): JSX.Element => <RouterProvider router={router} />
