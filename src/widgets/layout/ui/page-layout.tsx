import { Suspense, useCallback, useState, type JSX } from 'react'
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

    const [collapsed, setCollapsed] = useState(false)

    const onToggle = useCallback((): void => {
        setCollapsed((prev) => !prev)
    }, [])

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
                        sidebar={
                            <Sidebar
                                collapsed={collapsed}
                                onToggle={onToggle}
                            />
                        }
                        toolbar={<div>toolbar</div>}
                        collapsed={collapsed}
                    />
                </>
            }
            off={
                <>
                    <StoreUpdater />
                    <Navbar />
                    <div className="content-page">
                        <Sidebar collapsed={collapsed} onToggle={onToggle} />
                        <Suspense fallback={<PageLoader />}>
                            <Outlet />
                        </Suspense>
                    </div>
                </>
            }
        />
    )
}
