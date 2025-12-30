import { createBrowserRouter } from 'react-router'

import { privateRoutes, publicRoutes } from 'app/routes'

export const router = createBrowserRouter([...publicRoutes])
