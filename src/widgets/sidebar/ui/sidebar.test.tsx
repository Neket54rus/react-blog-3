import { fireEvent, screen } from '@testing-library/react'

import { componentRender } from 'shared/lib/test/componentRender'

import { Sidebar } from './sidebar'

describe('sidebar', () => {
    test('render', () => {
        componentRender(<Sidebar />)
        expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    })

    test('test toggle', () => {
        componentRender(<Sidebar />)
        const sidebar = screen.getByTestId('sidebar')
        const toggleBtn = screen.getByTestId('sidebar-toggle')
        expect(sidebar).toBeInTheDocument()
        fireEvent.click(toggleBtn)
        expect(sidebar).toHaveClass('collapsed')
    })
})
