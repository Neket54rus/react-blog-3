import { Suspense, type JSX } from 'react'
import { Outlet } from 'react-router'

import { StoreUpdater } from 'app/providers/store'

import { Navbar } from 'widgets/navbar'
import { PageLoader } from 'widgets/page-loader'
import { Sidebar } from 'widgets/sidebar'

export const PageLayout = (): JSX.Element => (
    <>
        <StoreUpdater />
        <Navbar />
        <div className="content-page">
            <Sidebar />
            <Suspense fallback={<PageLoader />}>
                <div className="page-wrapper">
                    <Outlet />
                </div>
            </Suspense>
        </div>
    </>
)
