import { memo } from 'react'

import { classNames } from 'shared/lib/class-names'

import classes from './admin-panel-page.module.scss'

interface AdminPanelPageProps {
    className?: string
}

const AdminPanelPage = memo((props: AdminPanelPageProps) => {
    const { className } = props

    return (
        <div className={classNames(classes.adminPanelPage, {}, [className])}>
            AdminPanelPage
        </div>
    )
})

export default AdminPanelPage
