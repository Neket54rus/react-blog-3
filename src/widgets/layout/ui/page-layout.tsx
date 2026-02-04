import { Suspense, type JSX } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router'

import { StoreUpdater } from 'app/providers/store'

import { Navbar } from 'widgets/navbar'
import { PageLoader } from 'widgets/page-loader'
import { Sidebar } from 'widgets/sidebar'

import { getUserInited } from 'entities/user'

import { MainLayout } from 'shared/layouts/main-layout'
import { ToggleFeatures } from 'shared/lib/features'

export const PageLayout = (): JSX.Element => {
    const isInited = useSelector(getUserInited)

    if (!isInited) {
        return <h1>Loading...</h1>
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <>
                    <StoreUpdater />
                    <MainLayout
                        content={
                            <Suspense fallback={<PageLoader />}>
                                <Outlet />
                            </Suspense>
                        }
                        header={<Navbar />}
                        sidebar={<Sidebar />}
                        toolbar={<div>toolbar</div>}
                    />
                </>
            }
            off={
                <>
                    <StoreUpdater />
                    <Navbar />
                    <div className="content-page">
                        <Sidebar />
                        <Suspense fallback={<PageLoader />}>
                            <Outlet />
                        </Suspense>
                    </div>
                </>
            }
        />
    )

    return (
        <>
            <StoreUpdater />
            <Navbar />
            <div className="content-page">
                <Sidebar />
                <Suspense fallback={<PageLoader />}>
                    <Outlet />
                </Suspense>
            </div>
        </>
    )
}
